import React, { useEffect, useState } from 'react';

export default function HeroFooter ({muted, setMuted, progress, currentTiming}) {

    const formatTiming = (timing) => {
        const minutes = Math.trunc(timing / 60);
        const seconds = Math.trunc(timing % 60);
        return `${minutes < 10 ? `0${minutes}`:minutes}:${seconds < 10 ? `0${seconds}`:seconds}`;
    }

    return (
        <footer>
            <div className='footer__data'>
                <nav className='footer__data__nav'>
                    <button className='footer__data__nav__next'>{formatTiming(currentTiming)}</button>
                    <button className='footer__data__nav__mute' onClick={(event) => {event.stopPropagation();setMuted(!muted)}}>{muted ? 'Unmute':'Mute'}</button>
                </nav>
                <div className='footer__data__wave'>
                <svg xmlns="http://www.w3.org/2000/svg" width="81" height="12" viewBox="0 0 81 12">
  <g id="Group_210" data-name="Group 210" transform="translate(-1806.5 -1012.5)">
    <line id="Line_47" data-name="Line 47" y1="12" transform="translate(1811 1012.5)" fill="none" stroke="#fbfbf6" stroke-width="1"/>
    <line id="Line_58" data-name="Line 58" y1="12" transform="translate(1851 1012.5)" fill="none" stroke="#fbfbf6" stroke-width="1"/>
    <line id="Line_48" data-name="Line 48" y1="8" transform="translate(1807 1016.5)" fill="none" stroke="#fbfbf6" stroke-width="1"/>
    <line id="Line_57" data-name="Line 57" y1="8" transform="translate(1847 1016.5)" fill="none" stroke="#fbfbf6" stroke-width="1"/>
    <line id="Line_66" data-name="Line 66" y1="8" transform="translate(1883 1016.5)" fill="none" stroke="#fbfbf6" stroke-width="1"/>
    <line id="Line_49" data-name="Line 49" y1="6" transform="translate(1815 1018.5)" fill="none" stroke="#fbfbf6" stroke-width="1"/>
    <line id="Line_59" data-name="Line 59" y1="6" transform="translate(1855 1018.5)" fill="none" stroke="#fbfbf6" stroke-width="1"/>
    <line id="Line_65" data-name="Line 65" y1="6" transform="translate(1879 1018.5)" fill="none" stroke="#fbfbf6" stroke-width="1"/>
    <line id="Line_50" data-name="Line 50" y1="3" transform="translate(1819 1021.5)" fill="none" stroke="#fbfbf6" stroke-width="1"/>
    <line id="Line_60" data-name="Line 60" y1="3" transform="translate(1859 1021.5)" fill="none" stroke="#fbfbf6" stroke-width="1"/>
    <line id="Line_51" data-name="Line 51" y1="12" transform="translate(1823 1012.5)" fill="none" stroke="#fbfbf6" stroke-width="1"/>
    <line id="Line_63" data-name="Line 63" y1="12" transform="translate(1871 1012.5)" fill="none" stroke="#fbfbf6" stroke-width="1"/>
    <line id="Line_61" data-name="Line 61" y1="12" transform="translate(1863 1012.5)" fill="none" stroke="#fbfbf6" stroke-width="1"/>
    <line id="Line_52" data-name="Line 52" y1="8" transform="translate(1827 1016.5)" fill="none" stroke="#fbfbf6" stroke-width="1"/>
    <line id="Line_64" data-name="Line 64" y1="8" transform="translate(1875 1016.5)" fill="none" stroke="#fbfbf6" stroke-width="1"/>
    <line id="Line_62" data-name="Line 62" y1="8" transform="translate(1867 1016.5)" fill="none" stroke="#fbfbf6" stroke-width="1"/>
    <line id="Line_53" data-name="Line 53" y1="3" transform="translate(1831 1021.5)" fill="none" stroke="#fbfbf6" stroke-width="1"/>
    <line id="Line_54" data-name="Line 54" y1="7" transform="translate(1835 1017.5)" fill="none" stroke="#fbfbf6" stroke-width="1"/>
    <line id="Line_55" data-name="Line 55" y1="12" transform="translate(1839 1012.5)" fill="none" stroke="#fbfbf6" stroke-width="1"/>
    <line id="Line_67" data-name="Line 67" y1="12" transform="translate(1887 1012.5)" fill="none" stroke="#fbfbf6" stroke-width="1"/>
    <line id="Line_56" data-name="Line 56" y1="6" transform="translate(1843 1018.5)" fill="none" stroke="#fbfbf6" stroke-width="1"/>
  </g>
</svg>

                </div>
            </div>
            <div className='footer__progress'>
                <div className='footer__progress__played' style={{width: `${progress}%`}}/>
            </div>
        </footer>
    )
}