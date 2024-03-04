package com.intearn.backend.controller;

import com.intearn.backend.config.PrincipalDetails;
import com.intearn.backend.domain.User;
import com.intearn.backend.dto.CMRespDto;
import com.intearn.backend.dto.UserDto;
import com.intearn.backend.exception.CustomValidationException;
import com.intearn.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        List<UserDto.Response> users = userService.getAllUsers();
        return new ResponseEntity<>(new CMRespDto<>(1, "전체 유저 조회 완료", users), HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        User user = principalDetails.getUser();
        UserDto.Response response = userService.getUser(user.getId());
        return new ResponseEntity<>(new CMRespDto<>(1, "유저 조회 완료", response), HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveUser(@Valid @RequestBody UserDto.SignUpForm signUpForm, BindingResult bindingResult) {
        Map<String, String> errorMap = new HashMap<>();
        try {
            if (bindingResult.hasErrors()) {
                for (FieldError error : bindingResult.getFieldErrors()) {
                    errorMap.put(error.getField(), error.getDefaultMessage());
                }
                throw new CustomValidationException("모든 정보를 입력해주시기 바랍니다.", errorMap);
            }
            userService.saveUser(signUpForm);
            return new ResponseEntity<>(new CMRespDto<>(1, "회원가입 완료", null), HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            throw new CustomValidationException("아이디 또는 닉네임이 중복됩니다.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto.LoginRequest loginRequest) throws NoSuchAlgorithmException {
        UserDto.AuthResponse response = userService.login(loginRequest);
        return new ResponseEntity<>(new CMRespDto<>(1, "로그인 완료", response), HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity<?> editUser(@RequestBody UserDto.PutRequest dto, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        User user = principalDetails.getUser();
        userService.editUser(dto, user);
        return new ResponseEntity<>(new CMRespDto<>(1, "회원 정보 수정 완료", null), HttpStatus.OK);
    }
}
