package com.campusmarketplace.repository;

import com.campusmarketplace.Entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT m FROM Message m WHERE " +
            "(m.from.id = :user1Id AND m.to.id = :user2Id) OR " +
            "(m.from.id = :user2Id AND m.to.id = :user1Id) " +
            "ORDER BY m.timestamp ASC")
    List<Message> findMessagesBetweenUsers(@Param("user1Id") Long user1Id,
                                           @Param("user2Id") Long user2Id);
}
