package com.intearn.backend.controller;

import com.intearn.backend.domain.Board;
import com.intearn.backend.dto.BoardDto;
import com.intearn.backend.service.BoardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.intearn.backend.dto.BoardDto.*;

@RestController
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    /**
     * 게시글 전체 조회
     */
    @GetMapping("/api/board")
    public List<BoardResponse> showBoard () {
        List<Board> allBoards = boardService.getAllBoards();
        return allBoards.stream()
                .map(m -> new BoardResponse(m.getId(), m.getTitle(), m.getContent(), m.getCreatedDate(), m.getModifiedDate(),
                                m.getUser().getId(), m.getUser().getNickname()))
                .collect(Collectors.toList());
    }

    /**
     * 게시글 상세 조회
     */
    @GetMapping("/api/board/{boardId}")
    public ResponseEntity<BoardDto.BoardResponse> showBoardDetail (@PathVariable("boardId") Long boardId) {
        Optional<Board> findBoard = boardService.getBoardById(boardId);
        if (findBoard.isPresent()) {
            Board board = findBoard.get();
            BoardDto.BoardResponse boardResponse = new BoardDto.BoardResponse(
                    board.getId(),
                    board.getTitle(),
                    board.getContent(),
                    board.getCreatedDate(),
                    board.getModifiedDate(),
                    board.getUser().getId(),
                    board.getUser().getNickname()
            );
            return ResponseEntity.ok(boardResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * 게시글 작성
     */
    @PostMapping("/api/board")
    public ResponseEntity<String> createBoard (@RequestBody @Valid BoardRequest boardRequest) {

        // Board 엔티티 객체 생성
        Board board = new Board();
        board.setTitle(boardRequest.getTitle());
        board.setContent(boardRequest.getContent());

        // 우선 사용자 정보는 담지 않고 저장함 (테스트용)
        Board newBoard = boardService.createBoard(board);

        if (newBoard != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body("게시글이 성공적으로 생성되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시문 생성에 실패하였습니다.");
        }
    }

}
