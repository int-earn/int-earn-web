package com.intearn.backend.controller;

import com.intearn.backend.config.PrincipalDetails;
import com.intearn.backend.domain.Board;
import com.intearn.backend.domain.Comment;
import com.intearn.backend.dto.BoardDto;
import com.intearn.backend.dto.CommentDto;
import com.intearn.backend.service.BoardService;
import com.intearn.backend.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.intearn.backend.dto.CommentDto.*;

@RestController
@RequiredArgsConstructor
public class CommentController {

    private final BoardService boardService;
    private final CommentService commentService;

    /**
     * 댓글 전체 조회
     */
    @GetMapping("/api/comment/{boardId}")
    public ResponseEntity<List<CommentResponse>> showComment (@PathVariable("boardId") Long boardId,
                                              @AuthenticationPrincipal PrincipalDetails principalDetails) {
        // 댓글이 위치한 게시글 조회
        Optional<Board> findBoard = boardService.getBoardById(boardId);

        // 해당 게시글이 존재하지 않을 때
        if (findBoard.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // 해당 게시글의 모든 댓글을 가져옴
        Board board = findBoard.get();
        List<Comment> commentsByBoard = commentService.getCommentsByBoard(board);

        // Dto 로 변환
        // isDeleted 는 임시로 일괄 false 처리하였음.
        List<CommentResponse> collect = commentsByBoard.stream()
                .map(m -> new CommentResponse(m.getId(), m.getContent(),
                        Objects.equals(m.getUser().getId(), principalDetails.getUser().getId()),
                        false, m.getCreatedDate(), m.getUser().getId(), m.getUser().getNickname(),
                        m.getUser().getMajor() == null ? null : m.getUser().getMajor().name(), m.getUser().getStudentId()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(collect);
    }

    /**
     * 댓글 작성
     */
    @PostMapping("/api/comment")
    public ResponseEntity<String> createComment(@RequestBody @Valid CommentRequest commentRequest,
                                                @AuthenticationPrincipal PrincipalDetails principalDetails) {

        // 새로운 Comment 객체 생성
        // 생성일은 서비스 계층에서 생성함
        Comment comment = new Comment();
        comment.setContent(commentRequest.getContent());
        comment.setBoard(boardService.getBoardById(commentRequest.getBoardId()).get());
        comment.setUser(principalDetails.getUser());

        // 댓글 생성
        Comment newComment = commentService.createComment(comment);

        // 성공 혹은 실패 응답 리턴
        if (newComment != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body("댓글이 성공적으로 생성되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("댓글 작성에 실패하였습니다.");
        }
    }


    /**
     * 댓글 삭제
     */
    @DeleteMapping("/api/comment/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable("commentId") Long commentId,
                                                @AuthenticationPrincipal PrincipalDetails principalDetails) {
        // commentId를 이용하여 comment 가져오기
        Optional<Comment> findComment = commentService.getCommentById(commentId);
        if (findComment.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("해당 id의 댓글을 찾을 수 없습니다.");
        }
        Comment comment = findComment.get();

        // 댓글 작성자가 아닌 다른 사람이 댓글을 삭제하려고 시도할 때
        Long authorId = comment.getUser().getId();
        Long userId = principalDetails.getUser().getId();
        if (!Objects.equals(authorId, userId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("댓글을 삭제할 권한이 없습니다.");
        }

        // 삭제 성공
        commentService.deleteComment(comment);
        return ResponseEntity.noContent().build();
    }


}
