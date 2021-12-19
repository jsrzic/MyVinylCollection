package hr.fer.progi.MyVinylCollection.rest.vinyl;


import hr.fer.progi.MyVinylCollection.service.VinylService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vinyls")
public class VinylController {

    @Autowired
    private VinylService vinylService;

    
}
