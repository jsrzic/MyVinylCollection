package hr.fer.progi.MyVinylCollection.dao;

import hr.fer.progi.MyVinylCollection.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    int countByUsername(String username);

    @Modifying
    @Query("UPDATE vinyl_user u SET u.isActive = :s WHERE u.id = :id")
    User updateUserStatus(@Param("id") Long id, @Param("s") boolean status);
}
