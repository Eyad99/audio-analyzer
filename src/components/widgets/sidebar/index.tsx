import Links from './components/Links';
import Card from '@/components/reusable/card';
import { renderThumb, renderTrack, renderView, renderViewMini } from '@/components/reusable/scrollbar/Scrollbar';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import insightsImg from '@/assets/img/others/insights.png';
import insightsIcon from '@/assets/img/others/logo-icon.png';
import MainRoutes from '@/routes/main';

function SidebarHorizon(props: { open: boolean; [x: string]: any }) {
	const { open, mini, hovered = false, handleOpenAndCloseSideBar } = props;

	return (
		<div
			className={`${
				mini === false ? 'w-[285px]' : 'w-[285px] xl:!w-[120px]'
			} duration-175 linear fixed !z-50 min-h-full transition-all md:!z-50 lg:!z-50 xl:!z-0 xl:block ${
				mini ? `` : `sm-max:hidden sm:hidden`
			} ${open ? '' : '-translate-x-[105%]'}`}
		>
			<Card extra={`ml-3 w-full h-[96.5vh] sm:mr-4 sm:my-4 m-7 !rounded-[20px]`}>
				<Scrollbars
					autoHide
					renderTrackVertical={renderTrack}
					renderThumbVertical={renderThumb}
					renderView={mini === false ? renderView : mini === true && hovered === true ? renderView : renderViewMini}
				>
					<div className='flex h-full flex-col justify-between '>
						<div>
							<div className={`mt-[30px] flex justify-around items-center `}>
								<div className='flex'>
									<div
										className={`font-poppins text-[26px] font-bold uppercase text-primary dark:text-white  ${
											mini === false ? 'block' : mini === true && hovered === true ? 'block' : 'hidden'
										}`}
									>
										<img src={insightsImg} width={170} />
									</div>
									<div
										className={`font-poppins text-[26px] font-bold uppercase text-primary dark:text-white ${
											mini === false ? 'hidden' : mini === true && hovered === true ? 'hidden' : 'block'
										}`}
									>
										<img src={insightsIcon} width={30} />
									</div>
								</div>
								{/* open and close sidebar */}
								{open ? (
									mini ? (
										<PanelRightClose className='cursor-pointer' onClick={() => handleOpenAndCloseSideBar()} />
									) : (
										<PanelRightOpen className='cursor-pointer' onClick={() => handleOpenAndCloseSideBar()} />
									)
								) : (
									''
								)}
							</div>
							<div className='mb-7 mt-[30px] h-px bg-gray-200 dark:bg-white/10' />
							{/* Nav item */}
							<ul>
								<Links mini={mini} hovered={hovered} routes={MainRoutes} />
							</ul>
						</div>
					</div>
				</Scrollbars>
			</Card>
		</div>
	);
}

export default SidebarHorizon;
