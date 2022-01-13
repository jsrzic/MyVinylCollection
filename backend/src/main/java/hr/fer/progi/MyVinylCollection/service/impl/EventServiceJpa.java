package hr.fer.progi.MyVinylCollection.service.impl;

import hr.fer.progi.MyVinylCollection.dao.EventRepository;
import hr.fer.progi.MyVinylCollection.domain.Event;
import hr.fer.progi.MyVinylCollection.domain.Location;
import hr.fer.progi.MyVinylCollection.mapper.MapStructMapper;
import hr.fer.progi.MyVinylCollection.rest.event.dto.EventDTO;
import hr.fer.progi.MyVinylCollection.service.EventService;
import hr.fer.progi.MyVinylCollection.service.RequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceJpa implements EventService {

    @Autowired
    private EventRepository eventRepo;

    @Autowired
    private MapStructMapper mapStructMapper;

    public Event findById(Long id) {
        return eventRepo.findById(id).orElseThrow(
                () -> new RequestDeniedException("No event with id " + id)
        );
    }

    @Override
    public Event createEvent(Event event) {
        return eventRepo.save(event);
    }

    @Override
    public List<Event> listAll() {
        return eventRepo.findAll();
    }

    @Override
    public boolean updateEventInfo(long eventId, EventDTO eventDTO) {
        Event event = findById(eventId);
        mapStructMapper.updateEventDTOtoEvent(eventDTO, event);
        eventRepo.save(event);
        return true;
    }

    @Override
    public boolean deleteEvent(long eventId){
        eventRepo.deleteById(eventId);
        return true;
    }
}
