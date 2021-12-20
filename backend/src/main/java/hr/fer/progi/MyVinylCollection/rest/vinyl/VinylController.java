package hr.fer.progi.MyVinylCollection.rest.vinyl;


import hr.fer.progi.MyVinylCollection.domain.Genre;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.domain.Vinyl;
import hr.fer.progi.MyVinylCollection.rest.security.VinylUserDetails;
import hr.fer.progi.MyVinylCollection.rest.user.dto.RegisterUserDTO;
import hr.fer.progi.MyVinylCollection.service.UserService;
import hr.fer.progi.MyVinylCollection.service.VinylService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/vinyls")
public class VinylController {

    @Autowired
    private VinylService vinylService;

    @Autowired
    private UserService userService;

    @PostMapping("")
    public Vinyl addVinyl(@RequestBody Vinyl vinyl,
                             @AuthenticationPrincipal VinylUserDetails userDetails) {
        System.out.println(userDetails.getUsername());
        User user = userService.findByUsername(userDetails.getUsername());
        return vinylService.addVinyl(vinyl, user);
    }
}
