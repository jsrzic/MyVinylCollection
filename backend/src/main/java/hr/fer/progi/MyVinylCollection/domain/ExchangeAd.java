package hr.fer.progi.MyVinylCollection.domain;

import hr.fer.progi.MyVinylCollection.rest.ad.dto.NewExchangeAdDTO;

import javax.persistence.*;

@Entity(name="exchange_ad")
public class ExchangeAd {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name="is_active")
    private boolean isActive;

    @ManyToOne
    @JoinColumn(name="vinyl_id", nullable=false)
    private Vinyl vinyl;

    @ManyToOne
    @JoinColumn(name="owner_id", nullable=false)
    private User owner;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "exchanged_vinyl_id", referencedColumnName = "id")
    private Vinyl exchangedVinyl;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "new_owner_id", referencedColumnName = "id")
    private User newOwner;

    public ExchangeAd() {
    }

    public ExchangeAd(NewExchangeAdDTO adDTO){
        this.isActive = true;
        this.owner = adDTO.getOwner();
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

    public Vinyl getVinyl() {
        return vinyl;
    }

    public void setVinyl(Vinyl vinyl) {
        this.vinyl = vinyl;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public Vinyl getExchangedVinyl() {
        return exchangedVinyl;
    }

    public void setExchangedVinyl(Vinyl exchangedVinyl) {
        this.exchangedVinyl = exchangedVinyl;
    }

    public User getNewOwner() {
        return newOwner;
    }

    public void setNewOwner(User newOwner) {
        this.newOwner = newOwner;
    }
}
