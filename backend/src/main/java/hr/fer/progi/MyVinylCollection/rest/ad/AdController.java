package hr.fer.progi.MyVinylCollection.rest.ad;

import hr.fer.progi.MyVinylCollection.domain.ExchangeAd;
import hr.fer.progi.MyVinylCollection.domain.SaleAd;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.rest.ad.dto.SaleAdDTO;
import hr.fer.progi.MyVinylCollection.rest.security.UserSession;
import hr.fer.progi.MyVinylCollection.service.ExchangeAdService;
import hr.fer.progi.MyVinylCollection.service.SaleAdService;
import hr.fer.progi.MyVinylCollection.service.UserService;
import hr.fer.progi.MyVinylCollection.service.VinylService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Secured({"ROLE_ADMIN", "ROLE_USER"})
@RequestMapping("/ads")
public class AdController {

    @Autowired
    UserSession userSession;

    @Autowired
    private UserService userService;

    @Autowired
    private SaleAdService saleAdService;

    @Autowired
    private ExchangeAdService exchangeAdService;

    @Autowired
    private VinylService vinylService;

    @GetMapping("/sale_ads")
    public List<SaleAd> getSaleAds(){
        return saleAdService.getActiveAds();
    }

    @GetMapping("/exchange_ads")
    public List<ExchangeAd> getExchangeAds(){
        return exchangeAdService.getActiveAds();
    }

    @PostMapping("/sale_ads")
    public SaleAd createNewSaleAd(@RequestBody SaleAdDTO adDTO){
        User user = userService.findByUsername(userSession.getUsername());
        return saleAdService.newAd(new SaleAd(adDTO, user));
    }



}
