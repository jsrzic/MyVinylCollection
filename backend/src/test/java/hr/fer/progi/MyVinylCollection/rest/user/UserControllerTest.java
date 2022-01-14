package hr.fer.progi.MyVinylCollection.rest.user;

import hr.fer.progi.MyVinylCollection.dao.UserRepository;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.rest.security.jwt.JwtUtils;
import hr.fer.progi.MyVinylCollection.service.UserService;
import hr.fer.progi.MyVinylCollection.service.impl.UserServiceJpa;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    @InjectMocks
    private UserController userController;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtils jwtUtils;

    @Mock
    private UserService userService;

    private User user;

    @Before
    public void setUp(){
        //userService = new UserServiceJpa(userRepository, passwordEncoder, jwtUtils);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();

        User user = new User();
        user.setId(1L);
        user.setName("Ime");
        user.setSurname("Prezime");
        user.setUsername("username");
        user.setPassword(passwordEncoder.encode("12345678"));
    }

    @Test
    public void testGetUsers() throws Exception {
        mockMvc.perform(get("/users")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testRegisterUserWithExistingPassword() throws Exception {
        //
    }

}