import './immCard.scss';

type Props = {
  id: number;
  machinestatus: number,
  inkjetstatus: number;
  labelstatus: number;
};



const ImmCard = (props: Props) => {
  return (
    <div className="ImmCard" style={{borderBottom: `20px solid ${props.machinestatus === 3 ? '#D72339': (props.machinestatus === 2 ? '#66667E': '#01893A')}`}}>
      <div className="content">
        <div className="cardtitle">Injection Molding Machine</div>
        <div className="number">{props.id}</div>
        <div className="icon">
          <img src='tt_immicon.png'/>
        </div>        
        <div className='printerStatus'>
          <div className='inkjet'>
            <div className='printerlabel'>
              Inkjet
            </div>
            <img src={props.inkjetstatus === 0 ? 'tt_reddot.svg': 'tt_greendot.svg'} />
          </div>
          <div className='label'>
            <div className='printerlabel'>
              Label
            </div>
            <img src={props.labelstatus === 0 ? 'tt_reddot.svg': 'tt_greendot.svg'} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImmCard;