package hr.fer.progi.MyVinylCollection.rest.home;

import hr.fer.progi.MyVinylCollection.domain.ExchangeAd;
import hr.fer.progi.MyVinylCollection.domain.SaleAd;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.domain.Vinyl;
import hr.fer.progi.MyVinylCollection.rest.ad.dto.ActiveAdsDto;
import hr.fer.progi.MyVinylCollection.rest.home.dto.ExchangeHomeDTO;
import hr.fer.progi.MyVinylCollection.rest.home.dto.SaleHomeDTO;
import hr.fer.progi.MyVinylCollection.rest.security.UserSession;
import hr.fer.progi.MyVinylCollection.rest.user.dto.UserProfileDTO;
import hr.fer.progi.MyVinylCollection.rest.vinyl.dto.UpdateVinylDTO;
import hr.fer.progi.MyVinylCollection.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/home")
public class HomeController {

    @Autowired
    UserSession userSession;

    @Autowired
    HomeService homeService;

    @Autowired
    private UserService userService;

    @Autowired
    private VinylService vinylService;

    @GetMapping("/vinyls")
    public List<Vinyl> getVinyls(){
      User user = userSession.getUser();
      return user==null ? homeService.getAllVinyls() : homeService.getVinyls(user);
    }

    @GetMapping("/sale_ads")
    public List<SaleHomeDTO> getSaleAds(){
        User user = userSession.getUser();
        return user==null ? homeService.getAllSaleAds() : homeService.getSaleAds(user);
    }

    @GetMapping("/exchange_ads")
    public List<ExchangeHomeDTO> getExchangeAds(){
        User user = userSession.getUser();
        return user==null ? homeService.getAllExchangeAds() : homeService.getExchangeAds(user);
    }

    @GetMapping("/vinyl/owner/{id}")
    public String getVinylOwner(@PathVariable Long id){
        try{
            Vinyl vinyl = vinylService.findById(id);
            return vinyl.getOwner().getUsername();
        }catch(RequestDeniedException e){
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @GetMapping("/vinyl/{id}")
    public UpdateVinylDTO getVinylInfo(@PathVariable Long id){
        try{
            return vinylService.getVinylInfo(id);
        }catch(RequestDeniedException e){
            throw new IllegalArgumentException(e.getMessage());
        }
    }

    @GetMapping("/search/{regex}")
    public List<String> searchUsersByRegex(@PathVariable String regex) {
        return userService.searchByRegex(regex);
    }

    @GetMapping("/profile/{username}")
    public UserProfileDTO getUserProfile(@PathVariable String username) {
        return userService.getUserProfile(userService.findByUsername(username));
    }



}
