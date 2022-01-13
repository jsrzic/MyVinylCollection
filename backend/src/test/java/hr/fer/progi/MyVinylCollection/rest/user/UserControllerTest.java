package hr.fer.progi.MyVinylCollection.rest.user;

import hr.fer.progi.MyVinylCollection.dao.UserRepository;
import hr.fer.progi.MyVinylCollection.rest.user.dto.RegisterUserDTO;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(UserController.class)
@ActiveProfiles({"test"})
//@ContextConfiguration("")
class UserControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private UserRepository userRepository;

    @Test
    public void registerUser() throws Exception {
        //RegisterUserDTO registerUserDTO = new RegisterUserDTO();
        //registerUserDTO.setName("Tea");
        //registerUserDTO.setSurname("Kristo");
        //registerUserDTO.setUsername("TKristo");
        //registerUserDTO.setPassword("123456789");
        //registerUserDTO.setEmail("tea.kristo@fer.hr");

        mvc.perform(post("/auth/register")
                        .accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Marta\", \"surname\":\"Dulibić\", \"username\":\"mdulibic1\"," +
                                "\"password\":\"12345678\", \"email\":\"dulibicmarta@gmail.com\", \"preferredGenres\":[1,2]}"))
                .andExpect(status().isCreated());
    }


}