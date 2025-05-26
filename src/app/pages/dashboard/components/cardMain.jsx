'use client';
import { useState, useEffect } from 'react';
import { Filter } from "@/app/components/Cards/filter";
import Card from "./card";
import '../styles/Habitaciones.css';

const CATEGORIAS = [
  "Habitación individual",
  "Habitación doble estándar (una cama doble)",
  "Habitación doble estándar (dos camas separadas)",
  "Habitación doble deluxe",
  "Estudio o apartamento",
  "Suite júnior",
  "Suite ejecutiva",
  "Suite presidencial"
];

const ESTADOS = [
  "Disponible",
  "Ocupada",
  "Limpieza",
  "Mantenimiento"
];

const Cards = ({ habitaciones }) => {
  const [filteredRooms, setFilteredRooms] = useState(habitaciones);
  const [filters, setFilters] = useState({ tipo: "all", piso: "all", estado: "all" });

  useEffect(() => {
    setFilteredRooms(habitaciones);
  }, [habitaciones]);

  const handleFilterChange = (filterProperty, value) => {
    const updatedFilters = { ...filters, [filterProperty]: value };
    setFilters(updatedFilters);

    const filtered = habitaciones.filter(room => {
      return (
        (updatedFilters.tipo === "all" || room.nombre === updatedFilters.tipo) &&
        (updatedFilters.piso === "all" || String(room.piso) === String(updatedFilters.piso)) &&
        (updatedFilters.estado === "all" || room.estado_disponibilidad === updatedFilters.estado)
      );
    });

    setFilteredRooms(filtered);
  };

  const handleResetFilters = () => {
    setFilters({ tipo: "all", piso: "all", estado: "all" });
    setFilteredRooms(habitaciones);
  };

  const pisosUnicos = [...new Set(filteredRooms.map(room => room.piso))].sort((a, b) => a - b);

  return (
    <>
      <div className="filters-wrapper">
        <Filter
          rooms={habitaciones}
          filters={filters}
          setFilteredRooms={setFilteredRooms}
          setFilters={(value) => handleFilterChange("tipo", value)}
          filterProperty="tipo"
          general="Categorías"
          options={CATEGORIAS}
        />
        <Filter
          rooms={habitaciones}
          filters={filters}
          setFilteredRooms={setFilteredRooms}
          setFilters={(value) => handleFilterChange("piso", value)}
          filterProperty="piso"
          general="Todos los pisos"
        />
        <Filter
          rooms={habitaciones}
          filters={filters}
          setFilteredRooms={setFilteredRooms}
          setFilters={(value) => handleFilterChange("estado", value)}
          filterProperty="estado"
          general="Estados"
          options={ESTADOS}
        />
        <button onClick={handleResetFilters} className="clear-filters-btn">
          Limpiar filtros
        </button>
      </div>

      {pisosUnicos.map((piso) => (
        <div key={piso}>
          <h2>Piso {piso}</h2>
          <div className='grid-wrapper'>
            {filteredRooms
              .filter(room => room.piso === piso)
              .map(room => (
                <Card key={room.id} habitacion={room} />
              ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Cards;
