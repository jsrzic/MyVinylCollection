package hr.fer.progi.MyVinylCollection.rest.user;

import hr.fer.progi.MyVinylCollection.rest.security.UserSession;
import hr.fer.progi.MyVinylCollection.rest.security.VinylUserDetailsService;
import hr.fer.progi.MyVinylCollection.rest.security.WebSecurity;
import hr.fer.progi.MyVinylCollection.service.UserService;
import hr.fer.progi.MyVinylCollection.service.impl.UserServiceJpa;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(UserController.class)
@ActiveProfiles({"test"})
class UserControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private VinylUserDetailsService vinylUserDetailsService;

    @MockBean
    private WebSecurity webSecurity;

    @MockBean
    private UserController userController;

    @MockBean
    private UserSession userSession;

    @MockBean
    private UserServiceJpa userServiceJpa;

    @Test
    void demoTestMethod() {
        assertTrue(true);
    }

}