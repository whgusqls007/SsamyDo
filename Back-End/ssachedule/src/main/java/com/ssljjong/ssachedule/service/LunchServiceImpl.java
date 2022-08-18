package com.ssljjong.ssachedule.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssljjong.ssachedule.dto.LunchDto;
import com.ssljjong.ssachedule.repository.LunchRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LunchServiceImpl implements LunchService {

	private final LunchRepository lunchRepository;

	/**
	 * * Find lunch menu data for a certain period of time
	 *
	 * @return return List<Lunch> for today
	 */

	@Override
	public List<LunchDto> getTodayLunch() {
		String today = String.valueOf(LocalDate.now());
		List<LunchDto> todayLunch = lunchRepository.findByDate(today).stream()
				.map(lunch -> new LunchDto(lunch.getId(), lunch.getMain(), lunch.getDetail(),
						lunch.getImg(),
						lunch.getStore(), lunch.getDate()))
				.collect(Collectors.toList());
		return todayLunch;
	}

	/**
	 * * Find lunch menu data for a certain period of time
	 *
	 * @param date date to find
	 * @return List<Lunch> for date given by param
	 */

	@Override
	public List<LunchDto> getLunchForDate(String date) {
		List<LunchDto> lunches = lunchRepository.findByDate(date).stream()
				.map(lunch -> new LunchDto(lunch.getId(), lunch.getMain(), lunch.getDetail(),
						lunch.getImg(),
						lunch.getStore(), lunch.getDate()))
				.collect(Collectors.toList());

		return lunches;
	}

	/**
	 * * Find lunch menu data for a certain period of time
	 *
	 * @param start start date to find
	 * @param end   end date to find
	 * @return return List<Lunch> in Period start ~ end
	 */

	@Override
	public List<LunchDto> getLunchesForPeriod(String start, String end) {
		List<LunchDto> lunches = lunchRepository.findByDateBetween(start, end).stream()
				.map(lunch -> new LunchDto(lunch.getId(), lunch.getMain(), lunch.getDetail(),
						lunch.getImg(),
						lunch.getStore(), lunch.getDate()))
				.collect(Collectors.toList());
		return lunches;
	}
}
