package kr.co.dmdm.service.board;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import kr.co.dmdm.dto.board.BoardDto;
import kr.co.dmdm.dto.common.FileDto;
import kr.co.dmdm.entity.board.Board;
import kr.co.dmdm.entity.File;
import kr.co.dmdm.entity.board.BoardTag;
import kr.co.dmdm.entity.board.BoardTagId;
import kr.co.dmdm.global.exception.CustomException;
import kr.co.dmdm.global.exception.ExceptionEnum;
import kr.co.dmdm.repository.jpa.board.BoardRepository;
import kr.co.dmdm.repository.jpa.board.BoardTagRepository;
import kr.co.dmdm.repository.jpa.common.FileRepository;
import kr.co.dmdm.service.common.BadWordService;
import kr.co.dmdm.service.common.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class BoardServiceImpl implements BoardService {

    private final FileService fileService;
    private final FileRepository fileRepository;
    private final BoardRepository boardRepository;
    private final BoardTagRepository boardTagRepository;
    private final BadWordService badWordService;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public void saveBoard(Map<String, Object> params) {
        try {
            String userId = "yiok79";

            BoardDto boardDto = convertBoardDto(params, userId);
            validateBoardContent(boardDto);

            Board boardEntity = convertToEntity(boardDto);
            boardEntity = boardRepository.saveAndFlush(boardEntity);

            if (boardEntity.getBoardId() == null) {
                throw new CustomException(ExceptionEnum.DATABASE_ERROR);
            }

            List<FileDto> files = convertFiles(params);
            processFiles(files, boardEntity.getBoardId(), userId);

            List<String> hashTags = convertHashTags(params);
            processHash(hashTags, boardEntity.getBoardId(), userId);

            log.info("게시글 저장이 성공적으로 완료되었습니다: {}", boardEntity);

        } catch (CustomException e) {
            log.error("비즈니스 로직 처리 중 오류 발생: {}", e.getMessage());
            throw e;
        }
    }

    private BoardDto convertBoardDto(Map<String, Object> params, String userId) {
        ObjectMapper objectMapper = new ObjectMapper();
        BoardDto boardDto = objectMapper.convertValue(params.get("board"), BoardDto.class);
        boardDto.setUserId(userId);
        log.info("BoardDto 변환 완료: {}", boardDto);
        return boardDto;
    }

    private void validateBoardContent(BoardDto boardDto) {
        badWordService.checkBadWord(boardDto.getBoardTitle());
        badWordService.checkBadWord(boardDto.getBoardContent());
        log.info("게시글 제목과 내용에 대한 비속어 검증 완료");
    }

    private Board convertToEntity(BoardDto boardDto) {
        Board boardEntity = modelMapper.map(boardDto, Board.class);
        log.info("BoardEntity 변환 완료: {}", boardEntity);
        return boardEntity;
    }

    private List<FileDto> convertFiles(Map<String, Object> params) {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.convertValue(params.get("files"), new TypeReference<List<FileDto>>() {
        });
    }

    private void processFiles(List<FileDto> files, Integer boardId, String userId) {
        String fileType = "BOARD";

        if (files != null && !files.isEmpty()) {
            files.forEach(file -> {
                file.setFileRefNo(String.valueOf(boardId));
                // 날짜 타입 수정: LocalDate.now() -> Instant.now()
                file.setInsertDt(LocalDate.now());

                File fileEntity = modelMapper.map(file, File.class);
                fileRepository.save(fileEntity);
            });
        }

        fileService.deleteFileByRefNoAndFileType(userId, fileType);
    }

    private List<String> convertHashTags(Map<String, Object> params) {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.convertValue(params.get("hashTags"), new TypeReference<List<String>>() {
        });
    }

    private void processHash(List<String> hashTags, Integer boardId, String userId) {
        List<BoardTag> boardTags = new ArrayList<>();

        for (int i = 0; i < hashTags.size(); i++) {
            String hashTag = hashTags.get(i);
            BoardTag boardTag = BoardTag.builder()
                    .id(new BoardTagId(boardId, hashTag))
                    .orderNo(i + 1)
                    .build();

            boardTags.add(boardTag);
        }

        boardTagRepository.saveAll(boardTags);
    }
}
