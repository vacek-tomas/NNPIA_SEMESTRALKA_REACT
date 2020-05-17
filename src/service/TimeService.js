import * as moment from 'moment';
import 'moment/locale/cs';

export function GetTime (time)
{
    return moment(time).format('DD. MMMM YYYY');
};

export function SetTime (time)
{
    return moment(time).format('YYYY-MM-DD');
};
