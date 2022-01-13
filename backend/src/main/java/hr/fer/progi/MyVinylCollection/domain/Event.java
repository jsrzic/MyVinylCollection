package hr.fer.progi.MyVinylCollection.domain;

import hr.fer.progi.MyVinylCollection.rest.event.dto.EventDTO;

import javax.persistence.*;

@Entity(name = "event")
public class Event {

    @Id
    @GeneratedValue
    private Long id;

    private String title;

    private String description;

    private String social_network_link;

    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location eventLocation;

    public Event(EventDTO dto) {
        this.title = dto.getTitle();
        this.description = dto.getDescription();
        this.social_network_link = dto.getSocial_network_link();
        this.eventLocation = dto.getEventLocation();
    }

    public Event() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSocial_network_link() {
        return social_network_link;
    }

    public void setSocial_network_link(String social_network_link) {
        this.social_network_link = social_network_link;
    }

    public Location getEventLocation() {
        return eventLocation;
    }

    public void setEventLocation(Location eventLocation) {
        this.eventLocation = eventLocation;
    }
}
