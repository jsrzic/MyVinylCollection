package hr.fer.progi.MyVinylCollection.domain;

import hr.fer.progi.MyVinylCollection.rest.ad.dto.NewSaleAdDTO;

import javax.persistence.*;

@Entity(name="sale_ad")
public class SaleAd {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name="is_active")
    private boolean isActive;

    private double price;

    @ManyToOne
    @JoinColumn(name="vinyl_id", nullable=false)
    private Vinyl vinyl;

    @ManyToOne
    @JoinColumn(name="owner_id", nullable=false)
    private User creator;


    public SaleAd() {
    }

    public SaleAd(NewSaleAdDTO adDTO) {
        this.isActive = true;
        this.price = adDTO.getPrice();
        this.creator = adDTO.getOwner();
        this.vinyl = adDTO.getVinyl();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Vinyl getVinyl() {
        return vinyl;
    }

    public void setVinyl(Vinyl vinyl) {
        this.vinyl = vinyl;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User owner) {
        this.creator = owner;
    }
}
