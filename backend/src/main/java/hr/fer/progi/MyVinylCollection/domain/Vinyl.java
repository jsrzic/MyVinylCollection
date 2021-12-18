package hr.fer.progi.MyVinylCollection.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import javax.persistence.*;;
import java.time.LocalTime;


import static hr.fer.progi.MyVinylCollection.util.CurrencyUtil.convertToEuro;

@Entity(name="vinyl")
public class Vinyl {

    @Id
    @GeneratedValue
    private Long id;

    private String album;

    private int releaseYear;

    @ManyToOne
    @JoinColumn(name="genre_id", nullable=false)
    private Genre genre;

    @ManyToOne
    @JoinColumn(name="subgenre_id")
    private Subgenre subgenre;

    @Lob
    private byte[] image;

    private int conditionEvaluation;

    private boolean isRare;

    private String description;

    private double priceKn;

    private String RPM;

    private double diameter;

    private String capacity;

    private String reproductionQuality;

    private int nmbOfAudioChannels;

    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime timeOfReproduction;

    private String getPrice() {
        return new StringBuilder().append(priceKn).append(" HRK").append("(").append(convertToEuro(priceKn)).append(" EUR").append(")").toString();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getAlbum() {
        return album;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public Subgenre getSubgenre() {
        return subgenre;
    }

    public void setSubgenre(Subgenre subgenre) {
        this.subgenre = subgenre;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public int getConditionEvaluation() {
        return conditionEvaluation;
    }

    public void setConditionEvaluation(int conditionEvaluation) {
        this.conditionEvaluation = conditionEvaluation;
    }

    public boolean isRare() {
        return isRare;
    }

    public void setRare(boolean rare) {
        isRare = rare;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPriceKn() {
        return priceKn;
    }

    public void setPriceKn(double priceKn) {
        this.priceKn = priceKn;
    }

    public String getRPM() {
        return RPM;
    }

    public void setRPM(String RPM) {
        this.RPM = RPM;
    }

    public double getDiameter() {
        return diameter;
    }

    public void setDiameter(double diameter) {
        this.diameter = diameter;
    }

    public String getCapacity() {
        return capacity;
    }

    public void setCapacity(String capacity) {
        this.capacity = capacity;
    }

    public String getReproductionQuality() {
        return reproductionQuality;
    }

    public void setReproductionQuality(String reproductionQuality) {
        this.reproductionQuality = reproductionQuality;
    }

    public int getNmbOfAudioChannels() {
        return nmbOfAudioChannels;
    }

    public void setNmbOfAudioChannels(int nmbOfAudioChannels) {
        this.nmbOfAudioChannels = nmbOfAudioChannels;
    }

    public LocalTime getTimeOfReproduction() {
        return timeOfReproduction;
    }

    public void setTimeOfReproduction(LocalTime timeOfReproduction) {
        this.timeOfReproduction = timeOfReproduction;
    }
}
