import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './auth.css';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [tipo_identificacion, setTipoIdentificacion] = useState<'CC' | 'CE' | 'NIT' | 'PASAPORTE'>('CC');
  const [sexo, setSexo] = useState<'M' | 'F' | 'OTRO'>('M');
  const [fecha_nacimiento, setFechaNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== passwordConfirmation) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!termsAccepted) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    setIsLoading(true);
    try {
      await register({
        nombres,
        apellidos,
        identificacion,
        tipo_identificacion,
        sexo,
        fecha_nacimiento,
        telefono,
        email,
        direccion,
        password,
        password_confirmation: passwordConfirmation,
        terms_accepted: termsAccepted,
      });
      navigate('/home');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al registrarse');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-blob auth-blob--1" />
        <div className="auth-blob auth-blob--2" />
        <div className="auth-blob auth-blob--3" />
      </div>

      <div className="auth-card auth-card--wide">
        <div className="auth-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
          </svg>
        </div>

        <h1 className="auth-title">Crear cuenta</h1>
        <p className="auth-subtitle">Completa tus datos para registrarte</p>

        {error && (
          <div className="auth-error" role="alert">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>

          <p className="form-section-title">Datos personales</p>
          <div className="form-grid">

            {/* Nombres */}
            <div className="form-group">
              <label htmlFor="reg-nombres" className="form-label">Nombres</label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <input id="reg-nombres" type="text" className="form-input" placeholder="Juan"
                  value={nombres} onChange={(e) => setNombres(e.target.value)} required autoComplete="given-name" />
              </div>
            </div>

            {/* Apellidos */}
            <div className="form-group">
              <label htmlFor="reg-apellidos" className="form-label">Apellidos</label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <input id="reg-apellidos" type="text" className="form-input" placeholder="Pérez"
                  value={apellidos} onChange={(e) => setApellidos(e.target.value)} required autoComplete="family-name" />
              </div>
            </div>

            {/* Tipo de identificación */}
            <div className="form-group">
              <label htmlFor="reg-tipo-id" className="form-label">Tipo de identificación</label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                </svg>
                <select id="reg-tipo-id" className="form-input form-select"
                  value={tipo_identificacion} onChange={(e) => setTipoIdentificacion(e.target.value as typeof tipo_identificacion)} required>
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="NIT">NIT</option>
                  <option value="PASAPORTE">Pasaporte</option>
                </select>
              </div>
            </div>

            {/* Número de identificación */}
            <div className="form-group">
              <label htmlFor="reg-identificacion" className="form-label">Número de identificación</label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
                </svg>
                <input id="reg-identificacion" type="text" className="form-input" placeholder="1234567890"
                  value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} required />
              </div>
            </div>

            {/* Sexo */}
            <div className="form-group">
              <label htmlFor="reg-sexo" className="form-label">Sexo</label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                </svg>
                <select id="reg-sexo" className="form-input form-select"
                  value={sexo} onChange={(e) => setSexo(e.target.value as typeof sexo)} required>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="OTRO">Otro</option>
                </select>
              </div>
            </div>

            {/* Fecha de nacimiento */}
            <div className="form-group">
              <label htmlFor="reg-fecha" className="form-label">Fecha de nacimiento</label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                <input id="reg-fecha" type="date" className="form-input form-date"
                  value={fecha_nacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required max={new Date().toISOString().split('T')[0]} />
              </div>
            </div>

          </div>{/* /form-grid */}

          <p className="form-section-title">Contacto</p>
          <div className="form-grid">

            {/* Teléfono */}
            <div className="form-group">
              <label htmlFor="reg-telefono" className="form-label">Teléfono</label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                <input id="reg-telefono" type="tel" className="form-input" placeholder="3001234567"
                  value={telefono} onChange={(e) => setTelefono(e.target.value)} required autoComplete="tel" />
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="reg-email" className="form-label">Correo electrónico</label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <input id="reg-email" type="email" className="form-input" placeholder="tu@email.com"
                  value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
              </div>
            </div>

            {/* Dirección — ocupa todo el ancho */}
            <div className="form-group form-group--full">
              <label htmlFor="reg-direccion" className="form-label">Dirección</label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <input id="reg-direccion" type="text" className="form-input" placeholder="Calle 123 # 45-67, Bogotá"
                  value={direccion} onChange={(e) => setDireccion(e.target.value)} required autoComplete="street-address" />
              </div>
            </div>

          </div>{/* /form-grid */}

          <p className="form-section-title">Seguridad</p>
          <div className="form-grid">

            {/* Contraseña */}
            <div className="form-group">
              <label htmlFor="reg-password" className="form-label">Contraseña</label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <input id="reg-password" type="password" className="form-input" placeholder="Mínimo 8 caracteres"
                  value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} autoComplete="new-password" />
              </div>
            </div>

            {/* Confirmar contraseña */}
            <div className="form-group">
              <label htmlFor="reg-password-confirm" className="form-label">Confirmar contraseña</label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
                <input id="reg-password-confirm" type="password" className="form-input" placeholder="Repite tu contraseña"
                  value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required autoComplete="new-password" />
              </div>
            </div>

          </div>{/* /form-grid */}

          <div className="terms-group">
            <input
              id="reg-terms"
              type="checkbox"
              className="terms-checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
            />
            <label htmlFor="reg-terms" className="terms-label">
              Acepto los <a href="#terms" className="terms-link">términos y condiciones</a> y autorizo el tratamiento de mis datos.
            </label>
          </div>

          <button id="register-submit" type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="btn-spinner" />
                Creando cuenta…
              </>
            ) : (
              'Crear cuenta'
            )}
          </button>
        </form>

        <p className="auth-switch">
          ¿Ya tienes cuenta?{' '}
          <Link to="/" className="auth-link">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}