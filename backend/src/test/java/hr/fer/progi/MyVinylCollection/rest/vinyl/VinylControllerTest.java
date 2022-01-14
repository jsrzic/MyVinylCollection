package hr.fer.progi.MyVinylCollection.rest.vinyl;

import com.fasterxml.jackson.databind.ObjectMapper;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.domain.Vinyl;
import hr.fer.progi.MyVinylCollection.service.VinylService;
import hr.fer.progi.MyVinylCollection.service.impl.VinylServiceJpa;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.jupiter.api.Disabled;
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

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class VinylControllerTest {

    @Autowired
    private MockMvc mockMvc;


    @Autowired
    @InjectMocks
    private VinylController vinylController;

    @Mock
    private VinylServiceJpa vinylServiceJpa;

    @Mock
    private PasswordEncoder passwordEncoder;

    private List<Vinyl> vinyls;

    private User user;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Before
    public void setUp(){
        mockMvc = MockMvcBuilders.standaloneSetup(vinylController).build();

        vinyls = new ArrayList<>();

        Vinyl vinyl1 = new Vinyl();
        vinyl1.setId(1L);
        vinyl1.setAlbum("Album");
        vinyl1.setDescription("best album ever");
        vinyl1.setReproductionQuality("good");
        vinyl1.setNmbOfAudioChannels(3);

        Vinyl vinyl2 = new Vinyl();
        vinyl1.setId(2L);
        vinyl1.setAlbum("AlbumAlbum");
        vinyl1.setReproductionQuality("good");
        vinyl1.setNmbOfAudioChannels(2);

        user = new User();
        user.setId(1L);
        user.setName("Ime");
        user.setSurname("Prezime");
        user.setUsername("username");
        user.setPassword(passwordEncoder.encode("12345678"));


        vinyls.add(vinyl1);
        vinyls.add(vinyl2);

    }

    @Test
    @Ignore
    public void testGetVinyls() throws Exception {
        mockMvc.perform(get("/vinyls")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @Ignore
    public void testAddNewVinyl() throws Exception {
        when(vinylServiceJpa.addVinyl(any(Vinyl.class), user)).thenReturn(vinyls.get(0));
        //when(vinylServiceJpa.addVinyl(vinyls.get(0), user)).thenReturn(vinyls.get(0));

        mockMvc.perform(post("/vinyls")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(vinyls.get(0))))
                .andExpect(status().isCreated());
    }

    @Test
    @Ignore
    public void testDeleteVinyl() throws Exception {
        doThrow(new EntityNotFoundException()).when(vinylServiceJpa).deleteVinyl(1L);

        mockMvc.perform(delete("/vinyls/{id}", 1L))
                .andExpect(status().isNotFound());
    }

}