package com.intearn.backend.controller;

import com.intearn.backend.config.PrincipalDetails;
import com.intearn.backend.domain.Board;
import com.intearn.backend.dto.BoardDto;
import com.intearn.backend.service.BoardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
                                m.getUser().getId(), m.getUser().getNickname(),
                                m.getUser().getMajor() == null ? null : m.getUser().getMajor().name(), m.getUser().getStudentId()))
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
                    board.getUser().getNickname(),
                    board.getUser().getMajor() == null ? null : board.getUser().getMajor().name(),
                    board.getUser().getStudentId()
            );
            return ResponseEntity.ok(boardResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * 게시글 제목 조회
     */
    @GetMapping("/api/board/title")
    public List<BoardTitleResponse> showBoardTitle () {
        List<Board> allBoards = boardService.getAllBoards();
        return allBoards.stream()
                .map(m -> new BoardTitleResponse(m.getId(), m.getTitle(), m.getCreatedDate()))
                .collect(Collectors.toList());
    }

    /**
     * 게시글 작성
     */
    @PostMapping("/api/board")
    public ResponseEntity<String> createBoard (@RequestBody @Valid BoardRequest boardRequest,
                                               @AuthenticationPrincipal PrincipalDetails principalDetails) {

        // Board 엔티티 객체 생성
        Board board = new Board();
        board.setTitle(boardRequest.getTitle());
        board.setContent(boardRequest.getContent());
        board.setUser(principalDetails.getUser());

        // 저장
        Board newBoard = boardService.createBoard(board);

        if (newBoard != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body("게시글이 성공적으로 생성되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시문 생성에 실패하였습니다.");
        }
    }


    /**
     * 게시글 수정
     */
    @PutMapping("/api/board/{boardId}")
    public ResponseEntity<String> modifyBoard (@RequestBody @Valid BoardRequest boardRequest,
                                             @PathVariable("boardId") Long boardId,
                                               @AuthenticationPrincipal PrincipalDetails principalDetails) {

        Optional<Board> findBoard = boardService.getBoardById(boardId);

        if (findBoard.isPresent()) {

            Board board = findBoard.get();

            // 현재 로그인한 사용자와 게시물 작성자가 일치하는지 확인
            Long userId = principalDetails.getUser().getId();
            Long authorId = board.getUser().getId();
            if (!userId.equals(authorId)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("게시글을 수정할 권한이 없습니다.");
            }

            // 게시물 내용 수정
            board.setTitle(boardRequest.getTitle());
            board.setContent(boardRequest.getContent());

            // 수정
            boardService.updateBoard(board);

            return ResponseEntity.ok().body("게시글이 성공적으로 수정되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시문 수정에 실패하였습니다.");
        }
    }

    /**
     * 게시글 삭제
     */
    @DeleteMapping("/api/board/{boardId}")
    public ResponseEntity<String> deleteBoard (@PathVariable("boardId") Long boardId,
                                               @AuthenticationPrincipal PrincipalDetails principalDetails) {

        Optional<Board> findBoard = boardService.getBoardById(boardId);

        if (findBoard.isPresent()) {

            Board board = findBoard.get();

            // 현재 로그인한 사용자와 게시물 작성자가 일치하는지 확인
            Long userId = principalDetails.getUser().getId();
            Long authorId = board.getUser().getId();
            if (!userId.equals(authorId)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("게시글을 삭제할 권한이 없습니다.");
            }

            // 삭제
            boardService.deleteBoard(boardId);

            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시문 삭제에 실패하였습니다.");
        }
    }

}
