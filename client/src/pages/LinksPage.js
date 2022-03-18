import React, { Fragment, useCallback, useContext, useEffect, useState } from "react"
import useHttp from "../hooks/http.hook"
import { AuthContext } from "../context/AuthContext"
import Loader from "../components/Loader"
import { LinksList } from "../components/LinksList"

export default function LinksPage() {
	const [links, setLinks] = useState([])
	const { loading, request } = useHttp()
	const { token } = useContext(AuthContext)

	const fetchLinks = useCallback(async () => {
		try {
			const fetched = await request("/api/link", "GET", null, { Authorization: `Bearer ${token}` })
			console.log("LinksPage >>>", fetched)
			setLinks(fetched)
		} catch (error) {}
	}, [token, request])

	useEffect(() => {
		fetchLinks()
	}, [fetchLinks])

	return loading ? <Loader /> : <LinksList links={links} />
}
