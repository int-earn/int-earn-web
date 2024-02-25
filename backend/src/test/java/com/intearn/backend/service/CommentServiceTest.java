package com.intearn.backend.service;

import com.intearn.backend.domain.Board;
import com.intearn.backend.domain.Comment;
import com.intearn.backend.repository.BoardRepository;
import com.intearn.backend.repository.CommentRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class CommentServiceTest {

    @Autowired
    BoardService boardService;

    @Autowired
    CommentService commentService;

    @Test
    void getAllComments() {
    }

    @Test
    void getCommentById() {
    }

    @Test
    void getCommentsByBoard() {
    }

    @Test
    @Rollback(value = false)
    void createComment() {
        Board board = new Board();
        board.setTitle("제목");
        board.setContent("내용");

        Board newBoard = boardService.createBoard(board);

        Comment comment = new Comment();
        comment.setContent("댓글 내용");
        comment.setBoard(newBoard);

        Comment newComment = commentService.createComment(comment);

        List<Comment> commentsByBoard = commentService.getCommentsByBoard(newBoard);

//        System.out.println(commentsByBoard.get(0).getContent());

        assertEquals(1, commentsByBoard.size());
    }

    @Test
    void updateComment() {
        Board board = new Board();
        board.setTitle("제목");
        board.setContent("내용");

        Board newBoard = boardService.createBoard(board);

        Comment comment = new Comment();
        comment.setContent("댓글 내용");
        comment.setBoard(newBoard);

        Comment newComment = commentService.createComment(comment);

        String modifiedComment = "수정된 댓글 내용.";
        newComment.setContent(modifiedComment);
        commentService.updateComment(newComment);

        List<Comment> commentsByBoard = commentService.getCommentsByBoard(newBoard);

        assertEquals(modifiedComment, commentsByBoard.get(0).getContent());
    }

    @Test
    void deleteComment() {
        Board board = new Board();
        board.setTitle("제목");
        board.setContent("내용");

        Board newBoard = boardService.createBoard(board);

        Comment comment = new Comment();
        comment.setContent("댓글 내용");
        comment.setBoard(newBoard);

        Comment newComment = commentService.createComment(comment);

        commentService.deleteComment(newComment.getId());

        List<Comment> commentsByBoard = commentService.getCommentsByBoard(newBoard);

        assertEquals(0, commentsByBoard.size());
    }
}