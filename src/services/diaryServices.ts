import diaryData from './diaries.json'
import { DiaryEntry, NonSensitiveInfoDiaryEntry, NewDiaryEntry } from '../types'

const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>

export const getEntries = (): DiaryEntry[] => diaries

export const getEntryWitoutSensitiveInfo = (): NonSensitiveInfoDiaryEntry[] => {
	return diaries.map(({ id, date, weather, visibility }) => ({
		id,
		date,
		weather,
		visibility,
	}))
}

export const findDiaryEntry = (id: number): DiaryEntry | undefined => {
	const entry = diaries.find(entry => entry.id === id)
	return entry
}

export const addDiaryEntry = (newDiaryEntry: NewDiaryEntry): DiaryEntry => {
	const newDiary = {
		id: Math.max(...diaries.map(diary => diary.id)) + 1,
		...newDiaryEntry,
	}

	diaries.push(newDiary)

	return newDiary
}

export const deleteDiary = (id: number): DiaryEntry[] => {
	const index = diaries.findIndex(entry => entry.id === id)
	return diaries.splice(index, 1)
}

export const updateDiaryEntry = (
	id: number,
	newDiaryEntry: NewDiaryEntry
): DiaryEntry | undefined => {
	const diary = findDiaryEntry(id)

	if (diary) {
		diary.date = newDiaryEntry.date
		diary.weather = newDiaryEntry.weather
		diary.visibility = newDiaryEntry.visibility
		diary.comment = newDiaryEntry.comment
	}

	return diary
}
