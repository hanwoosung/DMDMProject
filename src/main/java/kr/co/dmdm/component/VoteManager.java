package kr.co.dmdm.component;

import kr.co.dmdm.dto.fight.request.VoteRequestDto;
import kr.co.dmdm.dto.fight.response.VoteResponseDto;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * packageName    : kr.co.dmdm.component
 * fileName       : VoteManager
 * author         : 최기환
 * date           : 2025-01-23
 * description    : 투기장 투표 관리 클래스
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-23        최기환       최초 생성
 */
@Component
public class VoteManager {
    // 방별로 투표 상태를 저장
    private final Map<Long, Map<String, String>> userVotes = new ConcurrentHashMap<>();

    //방에 대한 투표현황 가져오기, 없으면 생성
    public Map<String, String> getVoteData(Long chatRoomId) {
        return userVotes.computeIfAbsent(chatRoomId, id -> new ConcurrentHashMap<>());
    }

    /**
     * 투표 등록
     * @return 투표결과 반환
     */
    public VoteResponseDto registerVote(Long chatRoomId, VoteRequestDto request) {
        Map<String, String> votes = getVoteData(chatRoomId);

        if(request == null) {
            return voteResult(votes);
        }

        if(request.getVote() == null){
            votes.remove(request.getUsername());
        } else {
            votes.put(request.getUsername(), request.getVote());
        }

        return voteResult(votes);
    }

    /**
     * 투표 결과
     */
    public VoteResponseDto voteResult(Map<String, String> votes) {
        VoteResponseDto voteResult = new VoteResponseDto(0, 0);

        for (String key : votes.keySet()) {
            if (votes.get(key).equals("LEFT")) {
                voteResult.setLeftVote(voteResult.getLeftVote() + 1);
            } else if(votes.get(key).equals("RIGHT")) {
                voteResult.setRightVote(voteResult.getRightVote() + 1);
            }
        }

        return voteResult;
    }
}
