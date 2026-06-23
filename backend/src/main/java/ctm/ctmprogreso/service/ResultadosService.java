package ctm.ctmprogreso.service;

import ctm.ctmprogreso.dto.PartidosDTO;
import ctm.ctmprogreso.dto.ResultadosDTO;
import ctm.ctmprogreso.model.Partidos;
import ctm.ctmprogreso.model.Resultados;
import ctm.ctmprogreso.repository.PartidosRepository;
import ctm.ctmprogreso.repository.ResultadosRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultadosService {

    @Autowired
    private FabricaResultadosService fabricaResultadosService;

    @Autowired
    private ResultadosRespository repository;
    @Autowired
    private ResultadosRespository resultadosRespository;

    public ResultadosDTO save(ResultadosDTO resultadosDTO) {
        Resultados resultados = fabricaResultadosService.crearResultados(resultadosDTO);
        Resultados savedResultados = repository.save(resultados);
        return fabricaResultadosService.crearResultadosDTO(savedResultados);
    }

    public List<ResultadosDTO> findAll() {
        List<Resultados> resultados = repository.findAll();
        return fabricaResultadosService.crearResultadosDTOS(resultados);
    }

    public ResultadosDTO findByID(int id) {
        Resultados resultados = repository.findById(id).orElse(null);
        return fabricaResultadosService.crearResultadosDTO(resultados);
    }

    public void deleteByID(Integer id) {
        repository.deleteById(id);
    }

    public ResultadosDTO update(ResultadosDTO resultadosDTO) {

        Resultados resultados=fabricaResultadosService.crearResultados(resultadosDTO);
        Resultados updateResultados = resultadosRespository.save(resultados);
        return fabricaResultadosService.crearResultadosDTO(updateResultados);}
    }






