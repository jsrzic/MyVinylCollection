package hr.fer.progi.MyVinylCollection.rest.ad;

import hr.fer.progi.MyVinylCollection.domain.ExchangeAd;
import hr.fer.progi.MyVinylCollection.domain.SaleAd;
import hr.fer.progi.MyVinylCollection.domain.User;
import hr.fer.progi.MyVinylCollection.rest.ad.dto.NewSaleAdDTO;
import hr.fer.progi.MyVinylCollection.rest.ad.dto.SaleAdDTO;
import hr.fer.progi.MyVinylCollection.service.ExchangeAdService;
import hr.fer.progi.MyVinylCollection.service.SaleAdService;
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
    private SaleAdService saleAdService;

    @Autowired
    private ExchangeAdService exchangeAdService;

    @Autowired
    private VinylService vinylService;

    @GetMapping("/sale_ads")
    public List<SaleAd> getSaleAds(){
        return (List<SaleAd>) saleAdService.getActiveAds();
    }

    @GetMapping("/exchange_ads")
    public List<ExchangeAd> getExchangeAds(){
        return (List<ExchangeAd>) exchangeAdService.getActiveAds();
    }

    @PostMapping("/sale_ads")
    public SaleAd addSaleAd(@AuthenticationPrincipal User u, @RequestBody SaleAdDTO adDTO){
        NewSaleAdDTO saleAdDTO = new NewSaleAdDTO();
        saleAdDTO.setOwner(u);
        saleAdDTO.setPrice(adDTO.getPrice());
        saleAdDTO.setVinyl(vinylService.findById(adDTO.getVinylId()));
        return (SaleAd) saleAdService.newAd(new SaleAd(saleAdDTO));
    }



}
