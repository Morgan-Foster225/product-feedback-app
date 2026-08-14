import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CATEGORIES } from '../api/categories'
import { addSuggestion } from '../api/suggestions'
import CategorySelect from '../components/CategorySelect'
import './AddFeedback.css'

export default function AddFeedback() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const titleRef = useRef(null)
  const categoryRef = useRef(null)
  const descriptionRef = useRef(null)

  const validate = useCallback(() => {
    const nextErrors = {}
    if (title.trim().length === 0 || title.length > 100) {
      nextErrors.title = "Can't be empty"
    }
    if (!CATEGORIES.includes(category)) {
      nextErrors.category = 'Please select a category'
    }
    if (description.trim().length === 0 || description.length > 500) {
      nextErrors.description = "Can't be empty"
    }
    return nextErrors
  }, [title, category, description])

  // Once the user has attempted a submit, re-run validation live so a field's
  // error clears as soon as it's corrected instead of lingering until the
  // next submit attempt.
  useEffect(() => {
    if (submitted) {
      setErrors(validate())
    }
  }, [validate, submitted])

  function focusFirstError(nextErrors) {
    if (nextErrors.title) {
      titleRef.current?.focus()
    } else if (nextErrors.category) {
      categoryRef.current?.focus()
    } else if (nextErrors.description) {
      descriptionRef.current?.focus()
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors)
      return
    }

    setSubmitError('')
    setSubmitting(true)
    try {
      await addSuggestion({ title: title.trim(), category, description: description.trim() })
      navigate('/')
    } catch {
      setSubmitError('Something went wrong — please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="container add-feedback">
      <Link to="/" className="add-feedback__back">
        ‹ Go Back
      </Link>

      <div className="add-feedback__card-wrap">
        <span className="add-feedback__badge" aria-hidden="true">
          +
        </span>

        <form className="add-feedback__form" onSubmit={handleSubmit} noValidate>
          <h1 className="add-feedback__heading">Create New Feedback</h1>

          {submitError && (
            <div className="add-feedback__banner" role="alert">
              {submitError}
            </div>
          )}

          <div className="field">
            <label htmlFor="title">Feedback Title</label>
            <p className="field__hint">Add a short, descriptive headline</p>
            <input
              id="title"
              ref={titleRef}
              type="text"
              value={title}
              maxLength={100}
              onChange={(e) => setTitle(e.target.value)}
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && (
              <p className="field__error" id="title-error">
                {errors.title}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="category">Category</label>
            <p className="field__hint">Choose a category for your feedback</p>
            <CategorySelect
              value={category}
              onChange={setCategory}
              invalid={Boolean(errors.category)}
              describedBy={errors.category ? 'category-error' : undefined}
              controlRef={categoryRef}
            />
            {errors.category && (
              <p className="field__error" id="category-error">
                {errors.category}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="description">Feedback Detail</label>
            <p className="field__hint">
              Include any specific comments on what should be improved, added, etc.
            </p>
            <textarea
              id="description"
              ref={descriptionRef}
              rows={5}
              maxLength={500}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={errors.description ? 'description-error' : undefined}
            />
            {errors.description && (
              <p className="field__error" id="description-error">
                {errors.description}
              </p>
            )}
          </div>

          <div className="add-feedback__actions">
            <button
              type="button"
              className="btn btn--cancel"
              onClick={() => navigate('/')}
              disabled={submitting}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn--primary" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
