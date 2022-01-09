package hr.fer.progi.MyVinylCollection.rest.ad.dto;

import hr.fer.progi.MyVinylCollection.domain.Vinyl;

public class SaleAdDTO {

    private double price;

    private Long vinylId;

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Long getVinylId() {
        return vinylId;
    }

    public void setVinylId(Long vinylId) {
        this.vinylId = vinylId;
    }
}
