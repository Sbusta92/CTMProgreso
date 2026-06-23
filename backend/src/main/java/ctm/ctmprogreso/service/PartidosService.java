package ctm.ctmprogreso.service;

import ctm.ctmprogreso.dto.PartidosDTO;
import ctm.ctmprogreso.model.Partidos;
import ctm.ctmprogreso.repository.PartidosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PartidosService {

    @Autowired
    private FabricaPartidosService fabricaPartidosService;

    @Autowired
    private PartidosRepository partidosRepository;

    public PartidosDTO save(PartidosDTO partidosDTO) {
        Partidos partidos = fabricaPartidosService.crearPartidos(partidosDTO);
        Partidos savedPartidos = partidosRepository.save(partidos);
        return fabricaPartidosService.crearPartidosDTO(savedPartidos);
    }

    public List<PartidosDTO> findAll() {
        List<Partidos> partidos = partidosRepository.findAll();
        return fabricaPartidosService.crearPartidosDTOS(partidos);
    }

    public PartidosDTO findByID(int id) {
        Partidos partidos = partidosRepository.findById(id).orElse(null);
        return fabricaPartidosService.crearPartidosDTO(partidos);
    }

    public void deleteByID(Integer id) {
        partidosRepository.deleteById(id);
    }

    public PartidosDTO update(PartidosDTO partidosDTO) {

    Partidos partidos=fabricaPartidosService.crearPartidos(partidosDTO);
    Partidos updatePartidos = partidosRepository.save(partidos);
    return fabricaPartidosService.crearPartidosDTO(updatePartidos);}
}
