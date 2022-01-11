package hr.fer.progi.MyVinylCollection.domain;

import javax.persistence.*;

@Entity(name="exchange_offer")
public class ExchangeOffer {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name="giving_vinyl_id")
    private Vinyl givingVinyl;

    @ManyToOne
    @JoinColumn(name="receiving_vinyl_id")
    private Vinyl receivingVinyl;

    @ManyToOne
    @JoinColumn(name="offeror_id")
    private User offeror;

    @ManyToOne
    @JoinColumn(name="ad_id")
    private ExchangeAd ad;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Vinyl getGivingVinyl() {
        return givingVinyl;
    }

    public void setGivingVinyl(Vinyl givingVinyl) {
        this.givingVinyl = givingVinyl;
    }

    public Vinyl getReceivingVinyl() {
        return receivingVinyl;
    }

    public void setReceivingVinyl(Vinyl receivingVinyl) {
        this.receivingVinyl = receivingVinyl;
    }

    public User getOfferor() {
        return offeror;
    }

    public void setOfferor(User offeror) {
        this.offeror = offeror;
    }

    public ExchangeAd getAd() {
        return ad;
    }

    public void setAd(ExchangeAd ad) {
        this.ad = ad;
    }
}
