package kr.co.dmdm.service.point;

import jakarta.transaction.Transactional;
import kr.co.dmdm.dto.point.request.PointHistoryRequestDto;
import kr.co.dmdm.entity.PointHistory;
import kr.co.dmdm.entity.User;
import kr.co.dmdm.entity.product.Product;
import kr.co.dmdm.global.exception.CustomException;
import kr.co.dmdm.global.exception.ExceptionEnum;
import kr.co.dmdm.repository.jpa.UserRepository;
import kr.co.dmdm.repository.jpa.point.PointHistoryRepository;
import kr.co.dmdm.repository.jpa.product.ProductRepository;
import kr.co.dmdm.type.PointHistoryType;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

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
    private final ProductRepository productRepository;
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
        PointHistory sendPointHistory = mapperPointDtoToPointHistory(pointDto);

        pointHistoryRepository.save(sendPointHistory);

        User sendUser = userRepository.findById(pointDto.getUserId()).get();
        sendUser.setUserPoint(sendUser.getUserPoint() + pointDto.getPoint());
        userRepository.save(sendUser);

        PointHistory receivePointHistory = mapperPointDtoToPointHistory(pointDto);
        receivePointHistory.setRemark(pointDto.getUserId());
        receivePointHistory.setUserId(pointDto.getRemark());
        receivePointHistory.setPointHistoryType(PointHistoryType.RECEIVE_POINT.name());
        receivePointHistory.setPoint(pointDto.getPoint() * -1);

        pointHistoryRepository.save(receivePointHistory);

        User receiveUser = userRepository.findById(pointDto.getRemark()).get();
        receiveUser.setUserPoint(receiveUser.getUserPoint() + receivePointHistory.getPoint());
    }

    private void buyProduct(PointHistoryRequestDto pointDto) {
        PointHistory buyPointHistory = mapperPointDtoToPointHistory(pointDto);

        pointHistoryRepository.save(buyPointHistory);

        User sendUser = userRepository.findById(pointDto.getUserId()).get();
        sendUser.setUserPoint(sendUser.getUserPoint() + pointDto.getPoint());
        userRepository.save(sendUser);

        Product product = productRepository.findById(Integer.valueOf(pointDto.getRemark())).orElse(null);
        if (product == null) throw new CustomException(ExceptionEnum.PRODUCT_NOT_FOUND);

        String sellUserId = product.getUserId();

        PointHistory sellPointHistory = modelMapper.map(pointDto, PointHistory.class);
        sellPointHistory.setUserId(sellUserId);
        sellPointHistory.setPointHistoryType(PointHistoryType.SELL_PRODUCT.name());
        sellPointHistory.setPoint(pointDto.getPoint() * -1);

        pointHistoryRepository.save(sellPointHistory);

        User receiveUser = userRepository.findById(sellUserId).get();
        receiveUser.setUserPoint(receiveUser.getUserPoint() + sellPointHistory.getPoint());
    }

    private PointHistory mapperPointDtoToPointHistory(PointHistoryRequestDto pointDto) {
        return modelMapper.map(pointDto, PointHistory.class);
    }
}
