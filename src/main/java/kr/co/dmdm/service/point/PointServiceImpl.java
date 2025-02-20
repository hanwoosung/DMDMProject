package kr.co.dmdm.service.point;

import jakarta.transaction.Transactional;
import kr.co.dmdm.dto.point.request.PointHistoryRequestDto;
import kr.co.dmdm.entity.PointHistory;
import kr.co.dmdm.entity.User;
import kr.co.dmdm.global.exception.CustomException;
import kr.co.dmdm.repository.jpa.UserRepository;
import kr.co.dmdm.repository.jpa.point.PointHistoryRepository;
import kr.co.dmdm.type.PointHistoryType;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;

/**
 * packageName    : kr.co.dmdm.service.point
 * fileName       : PointServiceImpl
 * author         : 황승현
 * date           : 2025-02-20
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-20        황승현       최초 생성
 */
@Service
@RequiredArgsConstructor
public class PointServiceImpl implements PointService {
    private final UserRepository userRepository;
    private final PointHistoryRepository pointHistoryRepository;
    private final ModelMapper modelMapper;

    @Transactional
    @Override
    public void savePoint(PointHistoryRequestDto pointDto) {
        if (pointDto.getUserId() == null || pointDto.getUserId().isEmpty()) {
            throw new CustomException(HttpStatus.BAD_REQUEST, "userId 비어있음");
        }
        if (pointDto.getRemark() == null || pointDto.getRemark().isEmpty()) {
            throw new CustomException(HttpStatus.BAD_REQUEST, "remark 비어있음");
        }

        switch (pointDto.getPointHistoryType()) {
            case SEND_POINT -> sendPoint(pointDto);
            case BUY_PRODUCT -> buyProduct(pointDto);
            case SELL_PRODUCT -> sellProduct(pointDto);
            default -> defaultSavePoint(pointDto);
        }
    }

    private void defaultSavePoint(PointHistoryRequestDto pointDto) {
        PointHistory pointHistory = modelMapper.map(pointDto, PointHistory.class);
        pointHistoryRepository.save(pointHistory);

        User user = userRepository.findById(pointDto.getUserId()).get();
        user.setUserPoint(user.getUserPoint() + pointDto.getPoint());
        userRepository.save(user);
    }

    private void sendPoint(PointHistoryRequestDto pointDto) {
    }

    private void buyProduct(PointHistoryRequestDto pointDto) {
    }

    private void sellProduct(PointHistoryRequestDto pointDto) {
    }
}
