package hr.fer.progi.MyVinylCollection.rest.vinyl;

import hr.fer.progi.MyVinylCollection.dao.VinylRepository;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.domain.Vinyl;
import hr.fer.progi.MyVinylCollection.rest.security.VinylUserDetails;
import hr.fer.progi.MyVinylCollection.rest.security.VinylUserDetailsService;
import hr.fer.progi.MyVinylCollection.rest.user.dto.RegisterUserDTO;
import hr.fer.progi.MyVinylCollection.rest.vinyl.dto.AddVinylDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.security.core.authority.AuthorityUtils.commaSeparatedStringToAuthorityList;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc(addFilters = false)
@WebMvcTest(VinylController.class)
@ActiveProfiles({"test"})
class VinylControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private VinylRepository vinylRepository;

    @Autowired
    private WebApplicationContext webAppContext;

    @BeforeEach
    public void setUp() {
        Authentication authentication = Mockito.mock(Authentication.class);
        RegisterUserDTO registerUserDTO = new RegisterUserDTO();
        registerUserDTO.setName("Tea");
        registerUserDTO.setSurname("Kristo");
        registerUserDTO.setUsername("TKristo");
        registerUserDTO.setPassword("123456789");
        registerUserDTO.setEmail("tea.kristo@fer.hr");
        User user = new User(registerUserDTO, null, null);
        when(authentication.getPrincipal()).thenReturn(new VinylUserDetails(user));
        //when(authentication.getAuthorities()).thenReturn(commaSeparatedStringToAuthorityList("ROLE_USER"));
        SecurityContext securityContext = Mockito.mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        //MockitoAnnotations.initMocks(this);
        //mvc = MockMvcBuilders.webAppContextSetup(webAppContext).build();

    }

    @Test
    public void testAddVinyl() throws Exception {
        mvc.perform(post("")
                        .accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON)
                .content("{ \"album\":\"skrtM\", \"artistId\": 5, \"releaseYear\": 1948, \"genreId\": 1," +
                        "\"subgenreId\": 1, \"conditionEvaluation\": 4, \"isRare\": false, \"description\" :\"blablabla\"," +
                        "\"priceKn\": 50.0, \"rpm\": \"33\", \"diameter\": 2.0, \"capacity\": \"50\"," +
                        "\"reproductionQuality\":\"good\", \"nmbOfAudioChannels\": 3,\"timeOfReproduction\": \"01:24:00\""))
                .andExpect(status().isCreated());
    }

    /*{
        "album":"skrtM",
            "artistId": 5,
            "releaseYear": 1948,
            "genreId": 1,
            "subgenreId": 1,
            "conditionEvaluation": 4,
            "isRare": false,
            "description" :"blablabla",
            "priceKn": 50.0,
            "rpm": "33",
            "diameter": 2.0,
            "capacity": "50",
            "reproductionQuality":"good",
            "nmbOfAudioChannels": 3,
            "timeOfReproduction": "01:24:00"
    }*/

}