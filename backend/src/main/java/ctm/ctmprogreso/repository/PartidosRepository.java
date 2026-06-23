package ctm.ctmprogreso.repository;

import ctm.ctmprogreso.model.Partidos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface PartidosRepository extends JpaRepository<Partidos, Integer> {
}
