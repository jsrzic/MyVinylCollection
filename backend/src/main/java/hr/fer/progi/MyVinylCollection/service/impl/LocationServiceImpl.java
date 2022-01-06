package hr.fer.progi.MyVinylCollection.service.location;

import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.exception.GeoIp2Exception;
import com.maxmind.geoip2.model.CityResponse;
import hr.fer.progi.MyVinylCollection.domain.Location;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.InetAddress;

@Service
public class LocationService {

    private DatabaseReader dbReader;

    public LocationService() throws IOException {
        File database =new File(this.getClass().getResource("/GeoLite2-City.mmdb").getPath());
        dbReader = new DatabaseReader.Builder(database).build();
    }



    public Location getLocation(String ip)
            throws IOException, GeoIp2Exception {
        InetAddress ipAddress = InetAddress.getByName(ip);
        CityResponse response = dbReader.city(ipAddress);

        String cityName = response.getCity().getName();
        String latitude =
                response.getLocation().getLatitude().toString();
        String longitude =
                response.getLocation().getLongitude().toString();
        return new Location(ip, cityName, latitude, longitude);
    }
}
