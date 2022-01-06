package hr.fer.progi.MyVinylCollection.rest.ad;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Secured({"ROLE_ADMIN", "ROLE_USER"})
@RequestMapping("/ads")
public class AdController {
}
