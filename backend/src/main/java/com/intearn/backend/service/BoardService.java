package com.intearn.backend.service;

import com.intearn.backend.domain.Board;
import com.intearn.backend.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardService {

    private final BoardRepository boardRepository;

    /**
     * 모든 게시글 조회
     */
    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    /**
     * 게시글 상세 조회
     */
    public Optional<Board> getBoardById(Long id) {
        return boardRepository.findById(id);
    }

    /**
     * 게시글 생성
     */
    @Transactional
    public Board createBoard(Board board) {
        // 게시글 작성 시간을 Service 계층에서 관리
        board.setCreatedDate(LocalDateTime.now());
        return boardRepository.save(board);
    }

    /**
     * 게시글 수정
     */
    @Transactional
    public Board updateBoard(Board board) {
        // 게시글 수정 시간을 Service 계층에서 관리
        board.setModifiedDate(LocalDateTime.now());
        return boardRepository.save(board);
    }

    /**
     * 게시글 삭제
     */
    @Transactional
    public void deleteBoard(Long id) {
        boardRepository.deleteById(id);
    }

}
