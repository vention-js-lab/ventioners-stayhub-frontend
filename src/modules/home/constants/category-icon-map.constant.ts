import { PiTent } from 'react-icons/pi';
import { TbTent } from 'react-icons/tb';
import HouseboatOutlinedIcon from '@mui/icons-material/HouseboatOutlined';
import VillaOutlinedIcon from '@mui/icons-material/VillaOutlined';
import ForestOutlinedIcon from '@mui/icons-material/ForestOutlined';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillageOutlined';
import LocalHotelIcon from '@mui/icons-material/LocalHotelOutlined';
import LiquorOutlinedIcon from '@mui/icons-material/LiquorOutlined';
import CoffeeIcon from '@mui/icons-material/CoffeeOutlined';
import CabinIcon from '@mui/icons-material/CabinOutlined';
import ApartmentIcon from '@mui/icons-material/ApartmentOutlined';
import BeachAccessIcon from '@mui/icons-material/BeachAccessOutlined';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoomOutlined';
import ParkOutlinedIcon from '@mui/icons-material/ParkOutlined';
import CastleOutlinedIcon from '@mui/icons-material/CastleOutlined';
import AgricultureOutlinedIcon from '@mui/icons-material/AgricultureOutlined';
import TerrainOutlinedIcon from '@mui/icons-material/TerrainOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import TempleBuddhistOutlinedIcon from '@mui/icons-material/TempleBuddhistOutlined';
import WaterOutlinedIcon from '@mui/icons-material/WaterOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import { type IconComponent } from '../types/icon.type';

type CategoryIconMap = {
  [key: string]: IconComponent;
};

export const categoryToIconMap: CategoryIconMap = {
  Hotels: BedOutlinedIcon,
  Apartments: ApartmentIcon,
  Villas: VillaOutlinedIcon,
  'Wildlife/Safari Lodges': ForestOutlinedIcon,
  Cottages: HolidayVillageIcon,
  Hostels: LocalHotelIcon,
  Resorts: BeachAccessIcon,
  Inns: LiquorOutlinedIcon,
  'Bed and Breakfasts': CoffeeIcon,
  Cabins: CabinIcon,
  Treehouses: ParkOutlinedIcon,
  Houseboats: HouseboatOutlinedIcon,
  Castles: CastleOutlinedIcon,
  Campgrounds: ForestOutlinedIcon,
  Yurts: TbTent,
  Farmhouses: AgricultureOutlinedIcon,
  'Cave Hotels': TerrainOutlinedIcon,
  Motels: MeetingRoomIcon,
  'Heritage Hotels': AccountBalanceOutlinedIcon,
  'Glamping Tents': PiTent,
  Chalets: CottageOutlinedIcon,
  Ryokans: TempleBuddhistOutlinedIcon,
  'Overwater Bungalows': WaterOutlinedIcon,
  'Desert Camps': WbSunnyOutlinedIcon,
  'Ice Hotels': AcUnitOutlinedIcon,
} as const;
