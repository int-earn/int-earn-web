package com.intearn.backend.service;

import com.intearn.backend.domain.Board;
import com.intearn.backend.domain.Comment;
import com.intearn.backend.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    /**
     * 모든 댓글 조회
     */
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    /**
     * 댓글 상세 조회
     */
    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }

    /**
     * 게시글에 속한 댓글 조회
     */
    public List<Comment> getCommentsByBoard(Board board) {
        return commentRepository.findByBoard(board);
    }

    /**
     * 댓글 생성
     */
    @Transactional
    public Comment createComment(Comment comment) {
        comment.setCreatedDate(LocalDateTime.now());
        return commentRepository.save(comment);
    }

    /**
     * 댓글 수정
     */
    @Transactional
    public Comment updateComment(Comment comment) {
        return commentRepository.save(comment);
    }

    /**
     * id 값으로 댓글 삭제
     */
    @Transactional
    public void deleteCommentById(Long id) {
        commentRepository.deleteById(id);
    }

    /**
     * 댓글 삭제
     */
    @Transactional
    public void deleteComment(Comment comment) {
        commentRepository.delete(comment);
    }
}

