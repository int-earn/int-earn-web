package com.intearn.backend.service;

import com.intearn.backend.domain.Board;
import com.intearn.backend.repository.BoardRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class BoardServiceTest {

    @Autowired
    BoardService boardService;

    @Test
//    @Rollback(value = false)
    void getAllBoards() {
        Board board1 = new Board();
        board1.setTitle("제목 1");
        board1.setContent("내용 1");

        Board board2 = new Board();
        board2.setTitle("제목 2");
        board2.setContent("내용 2");

        boardService.createBoard(board1);
        boardService.createBoard(board2);

        assertEquals(2, boardService.getAllBoards().size());
    }

    @Test
    void getBoardById() {
        // 생략
    }

    @Test
    void createBoard() {
        Board board = new Board();
        board.setTitle("제목입니다.");
        board.setContent("내용입니다.");

        // 새로 생성한 게시글
        Board newBoard = boardService.createBoard(board);

        // ID 값을 통해 찾은 게시글
        Optional<Board> findBoard = boardService.getBoardById(newBoard.getId());

        assertEquals(newBoard, findBoard.get());
    }

    @Test
    @Rollback(value = false)
    void updateBoard() {
        Board board = new Board();
        board.setTitle("제목");
        board.setContent("내용");

        Board newBoard = boardService.createBoard(board);

        String modifiedContent = "변경된 내용";
        newBoard.setContent(modifiedContent);

        Optional<Board> findBoard = boardService.getBoardById(newBoard.getId());
        if (!findBoard.isEmpty()) {
            assertEquals(modifiedContent, findBoard.get().getContent());
        }
    }

    @Test
    void deleteBoard() {
        Board board = new Board();
        board.setTitle("제목입니다.");
        board.setContent("내용입니다.");

        // 새로 생성한 게시글
        Board newBoard = boardService.createBoard(board);

        // 게시글 삭제
        boardService.deleteBoard(newBoard.getId());

        Optional<Board> findBoard = boardService.getBoardById(newBoard.getId());

        assertEquals(Optional.empty(), findBoard);
    }

}