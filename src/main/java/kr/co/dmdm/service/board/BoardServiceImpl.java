package kr.co.dmdm.service.board;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import kr.co.dmdm.dto.board.*;
import kr.co.dmdm.dto.common.FileDto;
import kr.co.dmdm.dto.point.request.PointHistoryRequestDto;
import kr.co.dmdm.entity.board.Board;
import kr.co.dmdm.entity.File;
import kr.co.dmdm.entity.board.BoardTag;
import kr.co.dmdm.entity.board.BoardTagId;
import kr.co.dmdm.global.exception.CustomException;
import kr.co.dmdm.global.exception.ExceptionEnum;
import kr.co.dmdm.repository.dao.board.BoardDao;
import kr.co.dmdm.repository.jpa.board.BoardRepository;
import kr.co.dmdm.repository.jpa.board.BoardTagRepository;
import kr.co.dmdm.repository.jpa.common.FileRepository;
import kr.co.dmdm.service.common.BadWordService;
import kr.co.dmdm.service.common.FileService;
import kr.co.dmdm.service.exp.ExpService;
import kr.co.dmdm.service.point.PointService;
import kr.co.dmdm.type.ExpHistoryType;
import kr.co.dmdm.type.PointHistoryType;
import kr.co.dmdm.utils.PagingUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class BoardServiceImpl implements BoardService {

    private final FileService fileService;
    private final FileRepository fileRepository;
    private final BoardDao boardDao;
    private final BoardRepository boardRepository;
    private final BoardTagRepository boardTagRepository;
    private final BadWordService badWordService;
    private final ModelMapper modelMapper;

    private final PointService pointService;
    private final ExpService expService;

    @Override
    @Transactional
    public void saveBoard(Map<String, Object> params) {
        try {
            String userId = (String) params.get("sess");

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

            PointHistoryRequestDto pointDto = new PointHistoryRequestDto();
            pointDto.setUserId(userId);
            pointDto.setPointHistoryType(PointHistoryType.WRITE_BOARD);
            pointDto.setPoint(3);
            pointDto.setRemark("글작성");

            pointService.savePoint(pointDto);

            expService.saveExp(ExpHistoryType.WRITE_BOARD, 30, userId);

        } catch (CustomException e) {
            log.error("비즈니스 로직 처리 중 오류 발생: {}", e.getMessage());
            throw e;
        }
    }

    @Override
    public Map<String, Object> getBoards(String boardType,
                                         String status,
                                         int page,
                                         int size,
                                         String searchType,
                                         String searchData,
                                         String sortType,
                                         String sess) {

        Map<String, Object> result = new HashMap<>();

        int boardCnt = boardCnt(boardType, status, searchType, searchData);

        int start = (page - 1) * size;
        int end = Math.min(start + size, boardCnt);

        List<BoardListDto> list = boardDao.getBoardList(boardType, status, start, size, searchType, searchData, sortType, sess);
        System.out.println(sess);
        splitTag(list);

        PagingUtil pagingUtil = new PagingUtil(boardCnt, page, size, 10);

        result.put("list", list);
        result.put("paging", pagingUtil);

        return result;
    }

    @Override
    public Map<String, Object> getBoard(int boardId, String sess) {

        boardDao.addViewCount(boardId);

        Map<String, Object> result = new HashMap<>();

        BoardDetailDto board = boardDao.getBoard(boardId, sess);

        if (board == null) {
            throw new CustomException(ExceptionEnum.NOT_FOUND);
        }

        if (!board.getStatus().equals("ACTIVE")) {
            throw new RuntimeException("존재하지 않는 게시판입니다.");
        }

        if (board.getTag() != null && !board.getTag().isEmpty()) {
            board.setTags(
                    Arrays.stream(board.getTag().split(","))
                            .map(String::trim)
                            .collect(Collectors.toList())
            );
        }

        List<CommentDto> comments = boardDao.getComments(boardId, sess);

        result.put("board", board);
        result.put("comments", comments);

        return result;
    }

    @Override
    public void setLikes(LikesDto likes) {

        if (!likes.getLoginLikes().isEmpty()) {
//            삭제하는 로직
            boardDao.deleteLikes(likes);
        }

        if (!likes.getLoginLikes().equals(likes.getLikeType())) {
//        넣는로직
            boardDao.insertLikes(likes);
        }
    }

    @Override
    public List<CommentDto> saveComment(CommentRequestDto comment) {

        badWordService.checkBadWord(comment.getCommentContent());

        boardDao.saveComment(comment);

        PointHistoryRequestDto pointDto = new PointHistoryRequestDto();
        pointDto.setUserId(comment.getUserId());
        pointDto.setPointHistoryType(PointHistoryType.WRITE_COMMENT);
        pointDto.setPoint(1);
        pointDto.setRemark("댓글작성");

        pointService.savePoint(pointDto);

        expService.saveExp(ExpHistoryType.WRITE_COMMENT, 10, comment.getUserId());

        return boardDao.getComments(comment.getBoardId(), comment.getUserId());
    }

    @Override
    public void deleteBoard(Long boardId) {
        boardDao.deleteBoard(boardId);
    }

    @Override
    public void deleteComment(Long commentId) {
        boardDao.deleteComment(commentId);
    }

    @Override
    public List<MyEmoticonDto> getEmoticons(String sess) {
        return boardDao.getMyEmoticons(sess);
    }

    private int boardCnt(String boardType, String status, String searchType, String searchData) {
        return boardDao.getBoardCnt(boardType, status, searchType, searchData);
    }

    private static void splitTag(List<BoardListDto> boardList) {
        for (BoardListDto board : boardList) {
            if (board.getTag() != null && !board.getTag().isEmpty()) {

                board.setTagList(
                        Arrays.stream(board.getTag().split(","))
                                .map(String::trim)
                                .collect(Collectors.toList())
                );

            } else {
                board.setTagList(new ArrayList<>());
            }
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
