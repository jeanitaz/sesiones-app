import { useState, useEffect, type FormEvent } from "react"
import { pedidos, getPedidos } from "../services/api"

export default function Pedidos() {
    const [cliente_id, setClienteId] = useState('');
    const [paquete_id, setPaqueteId] = useState('');
    const [fecha_inicio_plan, setFecha_inicio_plan] = useState('');
    const [fecha_fin_plan, setFecha_fin_plan] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [pedidosList, setPedidosList] = useState<any[]>([]);

    const cargarPedidos = async () => {
        try {
            const data = await getPedidos();
            if (Array.isArray(data)) {
                setPedidosList(data);
            } else if (data && Array.isArray(data.data)) {
                setPedidosList(data.data);
            }
        } catch (err) {
            console.error("Error al cargar pedidos:", err);
        }
    };

    useEffect(() => {
        cargarPedidos();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(false);

        setIsLoading(true);
        try {
            await pedidos({
                cliente_id,
                paquete_id,
                fecha_inicio_plan,
                fecha_fin_plan,
            });
            setClienteId('');
            setPaqueteId('');
            setFecha_inicio_plan('');
            setFecha_fin_plan('');
            
            await cargarPedidos();
        } catch (error) {
            console.log(error)
            setError(true)
        } finally {
            setIsLoading(false)
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Cliente ID" value={cliente_id} onChange={(e) => setClienteId(e.target.value)} />
                <input type="text" placeholder="Paquete ID" value={paquete_id} onChange={(e) => setPaqueteId(e.target.value)} />
                <input type="text" placeholder="Fecha inicio plan" value={fecha_inicio_plan} onChange={(e) => setFecha_inicio_plan(e.target.value)} />
                <input type="text" placeholder="Fecha fin plan" value={fecha_fin_plan} onChange={(e) => setFecha_fin_plan(e.target.value)} />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creando...' : 'Crear'}
                </button>
            </form>
            {error && <p>Ocurrió un error al crear el pedido.</p>}
            
            <h2 style={{ marginTop: '24px' }}>Mis Pedidos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Cliente ID</th>
                        <th>Paquete ID</th>
                        <th>Fecha inicio plan</th>
                        <th>Fecha fin plan</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidosList.map((p, idx) => (
                        <tr key={p.id || idx}>
                            <td>{p.cliente_id}</td>
                            <td>{p.paquete_id}</td>
                            <td>{p.fecha_inicio_plan}</td>
                            <td>{p.fecha_fin_plan}</td>
                            <td>{p.estado || 'Activo'}</td>
                        </tr>
                    ))}
                    {pedidosList.length === 0 && (
                        <tr>
                            <td colSpan={5} style={{ textAlign: 'center', color: '#94a3b8' }}>
                                No hay pedidos registrados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}
