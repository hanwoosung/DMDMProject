package kr.co.dmdm.service.exp;

import kr.co.dmdm.dto.ExpHistoryDto;
import kr.co.dmdm.entity.ExpHistory;
import kr.co.dmdm.entity.User;
import kr.co.dmdm.repository.jpa.ExpHistoryRepository;
import kr.co.dmdm.repository.jpa.UserRepository;
import kr.co.dmdm.type.ExpHistoryType;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

/**
 * 패키지명        : kr.co.dmdm.service.exp
 * 파일명          : ExpServiceImpl
 * 작성자          : 김상준
 * 일자            : 2025-02-23
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-02-23        김상준            최초 생성
 */

@Service
@RequiredArgsConstructor
public class ExpServiceImpl implements ExpService {

    private final ExpHistoryRepository expHistoryRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    @Override
    public void saveExp(ExpHistoryType expHistoryType, Integer exp, String userId) {

        ExpHistory expHistory = new ExpHistory();
        expHistory.setExp(exp);
        expHistory.setUserId(userId);
        expHistory.setExpHistoryType(expHistoryType.toString());
        expHistory.setRemark("");
        expHistory.setInsertDt(LocalDateTime.now());

        expHistoryRepository.save(expHistory);

        saveUserExp(userId, exp);
    }

    private void saveUserExp(String userId, Integer exp) {
        Optional<User> user = userRepository.findById(userId);

        Integer MAX_EXP = 1000;

        if (user.isPresent()) {
            User result = user.get();

            result.setUserExp(result.getUserExp() + exp);
            if (result.getUserExp() >= MAX_EXP) {
                result.setUserExp(result.getUserExp() - MAX_EXP);
                result.setUserLevel(result.getUserLevel() + 1);
            }

            userRepository.save(result);
        }
    }


}
