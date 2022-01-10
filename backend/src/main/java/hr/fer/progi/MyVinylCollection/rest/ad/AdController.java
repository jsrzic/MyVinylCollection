package hr.fer.progi.MyVinylCollection.rest.ad;

import hr.fer.progi.MyVinylCollection.domain.ExchangeAd;
import hr.fer.progi.MyVinylCollection.domain.SaleAd;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.rest.ad.dto.ExchangeAdDTO;
import hr.fer.progi.MyVinylCollection.rest.ad.dto.SaleAdDTO;
import hr.fer.progi.MyVinylCollection.rest.security.UserSession;
import hr.fer.progi.MyVinylCollection.service.ExchangeAdService;
import hr.fer.progi.MyVinylCollection.service.SaleAdService;
import hr.fer.progi.MyVinylCollection.service.UserService;
import hr.fer.progi.MyVinylCollection.service.VinylService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
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
        return saleAdService.newAd(new SaleAd(adDTO, user), user);
    }

    @PostMapping("/exchange_ads")
    public ExchangeAd createNewExchangeAd(@RequestBody ExchangeAdDTO adDTO){
        User user = userService.findByUsername(userSession.getUsername());
        return exchangeAdService.newAd(new ExchangeAd(adDTO, user));
    }

    @DeleteMapping("/sale_ads/{id}")
    public ResponseEntity<Object> deleteSaleAd(@PathVariable Long id){
        User user = userService.findByUsername(userSession.getUsername());
        if(saleAdService.deleteAd(id, user))
            return new ResponseEntity<Object>(id, HttpStatus.OK);
        return new ResponseEntity<Object>(id, HttpStatus.EXPECTATION_FAILED);
    }

    @DeleteMapping("/exchange_ads/{id}")
    public ResponseEntity<Object> deleteExchangeAd(@PathVariable Long id){
        User user = userService.findByUsername(userSession.getUsername());
        if(exchangeAdService.deleteAd(id, user))
            return new ResponseEntity<Object>(id, HttpStatus.OK);
        return new ResponseEntity<Object>(id, HttpStatus.EXPECTATION_FAILED);
    }

    @PutMapping("/exchange_ads/update/{id}")
    public ResponseEntity<Object> exchangeOwners(@PathVariable Long id, @RequestBody Long newOwnerId){
        User user = userService.findByUsername(userSession.getUsername());
        if(exchangeAdService.exchangeOwners(id, newOwnerId, user))
            return new ResponseEntity<Object>(id, HttpStatus.OK);
        return new ResponseEntity<Object>(id, HttpStatus.EXPECTATION_FAILED);
    }

    @PutMapping("/sale_ads/update/{id}")
    public ResponseEntity<Object> setSaleAdInactive(@PathVariable Long id){
        User user = userService.findByUsername(userSession.getUsername());
        if(saleAdService.setSaleAdInactive(id, user))
            return new ResponseEntity<Object>(id, HttpStatus.OK);
        return new ResponseEntity<Object>(id, HttpStatus.EXPECTATION_FAILED);

    }

}
