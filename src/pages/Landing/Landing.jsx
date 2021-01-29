import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import routesDict from '@utils/routesDict';
import PageContainer from '../../hocs/PageContainer/PageContainer';
import styles from './Landing.module.scss';

const Landing = () => {
  const {
    landing,
    landingHeader,
    landingSection,
    landingSectionLighter,
    landingCircleDigit,
  } = styles;

  useEffect(() => {
    document.title = `Quve — Сервис контроля личного бюджета`;
  }, []);

  return (
    <main className={['main', landing].join(' ')}>
      <section className={landingHeader}>
        <PageContainer>
          <div className="row">
            <div className="col-sm-5">
              <h1 className="mb-3">Контролируйте свой личный <span>бюджет</span> легко!</h1>
              <p className="mb-5">Сервис позволяет грамотно планировать свой бюджет, сохранять и преумножать Ваш капитал.</p>
              <Link to={routesDict.SIGN_UP} className="btn btn-primary btn-outline">Начать пользоваться <strong>бесплатно</strong></Link>
            </div>
          </div>
        </PageContainer>
      </section>
      <section className={[landingSection, landingSectionLighter].join(' ')}>
        <PageContainer>
          <div className="row mb-4">
            <div className="col-12">
              <h2>Как это работает?</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              <div className={landingCircleDigit}>1</div>
              <p>Вы указываете свои месячные доходы и постоянные расходы</p>
            </div>
            <div className="col-sm-3">
              <div className={landingCircleDigit}>2</div>
              <p>Уточняете желаемый объем сберегаемых/инвестируемых средств</p>
            </div>
            <div className="col-sm-3">
              <div className={landingCircleDigit}>3</div>
              <p>Система рассчитывает оптимальный дневной бюджет и следит за его исполнением</p>
            </div>
            <div className="col-sm-3">
              <div className={landingCircleDigit}>4</div>
              <p>Детализация позволяет получать аналитику и корректировать личный бюджет</p>
            </div>
          </div>
        </PageContainer>
      </section>
    </main>
  );
};

export default Landing;
