package com.intearn.backend.service;

import com.intearn.backend.config.JwtService;
import com.intearn.backend.domain.User;
import com.intearn.backend.dto.UserDto;
import com.intearn.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Transactional
    public List<UserDto.Response> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserDto.Response(user))
                .collect(Collectors.toList());
    }

    @Transactional
    public UserDto.Response getUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return new UserDto.Response(user);
    }

    @Transactional
    public void saveUser(UserDto.SignUpForm signUpForm) {
        if (!signUpForm.getPassword().equals(signUpForm.getRePassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }
        signUpForm.setPassword(passwordEncoder.encode(signUpForm.getPassword()));
        userRepository.save(signUpForm.toEntity());
    }

    @Transactional
    public UserDto.AuthResponse login(UserDto.LoginRequest loginRequest) throws NoSuchAlgorithmException {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        // -> user is authenticated
        var user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return new UserDto.AuthResponse(jwtToken);

    }

    @Transactional
    public void editUser(UserDto.PutRequest dto, User prevUser) {
        User user = userRepository.findById(prevUser.getId()).orElseThrow();
        user.setNickname(dto.getNickname());
        user.setUsername(dto.getUsername());
        user.setStudentId(dto.getStudentId());
        user.setMajor(dto.getMajor());
        userRepository.save(user);
    }
}
