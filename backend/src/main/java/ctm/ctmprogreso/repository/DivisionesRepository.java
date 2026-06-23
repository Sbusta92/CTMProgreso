package ctm.ctmprogreso.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ctm.ctmprogreso.model.Divisiones;
import org.springframework.stereotype.Repository;


public interface DivisionesRepository extends JpaRepository<Divisiones, Integer> {
}
