import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { ouvreVille } from '../data/meteoSlice';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const villes = useSelector(state => state.meteo.villes);
    const actuelVille = useSelector(state => state.meteo.actuelVille.id);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    

    const ouvrirVille = (id)=> {
      dispatch(ouvreVille(id))
    }
    return (
          <aside className="sidebar">
            <div className="brand">
              <div style={{width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--sidebar-primary)', borderRadius: 'var(--radius-md)'}}>
                <Icon icon="lucide:cloud" style={{fontSize: "20px", color: 'var(--sidebar-primary-foreground)'}} />
              </div>
              <span>Atmos</span>
            </div>

            <div className="nav-section-title">
              <div>Villes</div>
              <div onClick={()=> navigate('/settings')} >
                <Icon icon="lucide:settings" style={{fontSize: "18px"}} className='settingsBtn' />
              </div>
            </div>
            <div className="city-list">
              {villes.map((ville)=> (
                <div className={`city-item ${ville.id === actuelVille ? 'active' : '' }`} key={ville.id}
                  onClick={() => ouvrirVille(ville.id)}>
                  <div className="city-info" onClick={() => ouvrirVille(ville.id)}>
                    <span className="city-name">{ville.ville}</span>
                    <span className="city-desc">{ville.pays}</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
    )
}

export default Sidebar;